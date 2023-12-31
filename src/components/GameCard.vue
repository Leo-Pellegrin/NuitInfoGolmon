<template>
  <div
    v-if="isShowing"
    ref="interactElement"
    :class="{
      isAnimating: isInteractAnimating,
      isCurrent: isCurrent
    }"
    class="card"
    :id="card.id"
    :style="{ transform: transformString}"
    style="text-align: center"
  >
  <div>
      <h3 class="cardTitle">{{ card.question }}</h3>
      <p class="cardSource">Source : {{ card.source }}</p>
    </div>
  </div>
</template>

<script>
import interact from 'interactjs/dist/interact.js';
import { useTheme } from 'vuetify';
import { watch } from 'vue';


const ACCEPT_CARD = "cardAccepted";
const REJECT_CARD = "cardRejected";
const SKIP_CARD = "cardSkipped";

export default {
  setup(){
    const theme = useTheme();
    console.log(theme.global.current.value.dark)
    watch(() => theme.global.current.value.dark, (newValue, oldValue) => {
      
      let cards = document.getElementById("visibleCards");
      if(theme.global.current.value.dark){
        console.log(theme.global.current.value.dark)
        console.log(cards.childNodes)
        for(let card of cards.children) {
          console.log(card.id)
          if (card.id % 2 === 0) {
            card.style.backgroundImage = "linear-gradient(180deg, #013972 2%, #116897 100%)";
            console.log(card.style.backgroundImage)
          }
          else{
            card.style.backgroundImage = "linear-gradient(180deg, #01151A 2%, #06283E 100%)"
            console.log(card.style.backgroundImage)
          }
        }
      }
      else{
        for(let card of cards.children) {
          if (card.id % 2 === 0) {
            card.style.backgroundImage = "linear-gradient(180deg, #F1A3A9 2%, #F9BBAC 100%)";
          }
          else{
            card.style.backgroundImage = "linear-gradient(180deg, #394635 2%, #FCED98 100%)"
          }
        }
      }
    });
    return {
      theme
    }
  },
  static: {
    interactMaxRotation: 15,
    interactOutOfSightXCoordinate: 500,
    interactOutOfSightYCoordinate: 600,
    interactYThreshold: 150,
    interactXThreshold: 100
  },

  props: {
    card: {
      type: Array,
      required: true
    },
    isCurrent: {
      type: Boolean,
      required: true
    }
  },

  data() {
    return {
      isShowing: true,
      isInteractAnimating: true,
      isInteractDragged: null,
      interactPosition: {
        x: 0,
        y: 0,
        rotation: 0
      }
    };
  },
  computed: {
    transformString() {
      if (!this.isInteractAnimating || this.isInteractDragged) {
        const {x, y, rotation} = this.interactPosition;
        return `translate3D(${x}px, ${y}px, 0) rotate(${rotation}deg)`;
      }

      return null;
    }
  },
  mounted() {
    if (this.card.id % 2 === 0) {
      if(this.theme.global.current.value.dark) {
        this.$refs.interactElement.style.backgroundImage = "linear-gradient(180deg, #013972 2%, #116897 100%)";
      }
      else {
        this.$refs.interactElement.style.backgroundImage = "linear-gradient(-180deg, #F1A3A9 2%, #F9BBAC 100%)";
      }
      //change the backgroundImage of my card with a linear gradient
    }
    else {
      if(this.theme.global.current.value.dark) {
        this.$refs.interactElement.style.backgroundImage = "linear-gradient(180deg, #01151A 2%, #06283E 100%)"
      }
      else {
        this.$refs.interactElement.style.backgroundImage = "linear-gradient(-180deg, #394635 2%, #FCED98 100%)";
      }    
    }
    const element = this.$refs.interactElement;
    interact(element).draggable({
      onstart: () => {
        this.isInteractAnimating = false;
      },

      onmove: event => {
        const {
          interactMaxRotation,
          interactXThreshold
        } = this.$options.static;
        const x = this.interactPosition.x + event.dx;
        const y = this.interactPosition.y + event.dy;

        let rotation = interactMaxRotation * (x / interactXThreshold);

        if (rotation > interactMaxRotation) rotation = interactMaxRotation;
        else if (rotation < -interactMaxRotation)
          rotation = -interactMaxRotation;

        this.interactSetPosition({ x, y, rotation });
      },

      onend: () => {
        const { x, y } = this.interactPosition;
        const { interactXThreshold, interactYThreshold } = this.$options.static;
        this.isInteractAnimating = true;

        if (x > interactXThreshold) this.playCard(ACCEPT_CARD);
        else if (x < -interactXThreshold) this.playCard(REJECT_CARD);
        else if (y > interactYThreshold) this.playCard(SKIP_CARD);
        else this.resetCardPosition();
      }
    });
  },

  beforeUnmount() {
    interact(this.$refs.interactElement).unset();
  },

  methods: {
    themeColor(colorName) {
      return this.$vuetify.theme.themes.light.colors[colorName];
    },
    hideCard() {
      setTimeout(() => {
        this.isShowing = false;
        this.$emit("hideCard", this.card);
      }, 300);
    },
    playCard(interaction) {
      const {
        interactOutOfSightXCoordinate,
        interactOutOfSightYCoordinate,
        interactMaxRotation
      } = this.$options.static;

      this.interactUnsetElement();

      switch (interaction) {
        case ACCEPT_CARD:
          this.interactSetPosition({
            x: interactOutOfSightXCoordinate,
            rotation: interactMaxRotation
          });
          this.$emit(ACCEPT_CARD);
          break;
        case REJECT_CARD:
          this.interactSetPosition({
            x: -interactOutOfSightXCoordinate,
            rotation: -interactMaxRotation
          });
          this.$emit(REJECT_CARD);
          break;
        case SKIP_CARD:
          this.interactSetPosition({
            y: interactOutOfSightYCoordinate
          });
          this.$emit(SKIP_CARD);
          break;
      }

      this.hideCard();
    },

    interactSetPosition(coordinates) {
      const { x = 0, y = 0, rotation = 0 } = coordinates;
      this.interactPosition = { x, y, rotation };
    },

    interactUnsetElement() {
      interact(this.$refs.interactElement).unset();
      this.isInteractDragged = true;
    },

    resetCardPosition() {
      this.interactSetPosition({ x: 0, y: 0, rotation: 0 });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/index.scss";

$cardsTotal: 25;
$cardsWidth: 300px;
$cardsPositionOffset: 55vh * 0.06;
$cardsScaleOffset: 0.08;
$defaultTranslation: $cardsPositionOffset * $cardsTotal;
$defaultScale: 1 - ($cardsScaleOffset * $cardsTotal);
$fs-card-title: 3.525em;

.card {
  @include card();
  @include absolute(0);
  @include sizing(100% 80vw);
  @include flex-center();

  @include after() {
    @include sizing(21px 3px);
    @include absolute(right 0 bottom 11px left 0);

    margin: auto;
    border-radius: 100px;
    background: rgba($c-black, 0.3);
  }

  display: flex;
  max-height: 550px;
  margin: auto;
  font-size: $fs-h2;
  font-weight: $fw-bold;
  color: $c-white;
  opacity: 0;
  transform: translateY($defaultTranslation) scale($defaultScale);
  transform-origin: 50%, 100%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  user-select: none;
  pointer-events: none;
  will-change: transform, opacity;

  height: 100vw;

  &.isCurrent {
    pointer-events: auto;
  }

  &.isAnimating {
    transition: transform 0.7s $ease-out-back;
  }
}

.cardTitle {
  margin: 0 0 15px;
  font-size: $fs-card-title;
}

.cardSource {
  margin-top: 20px;
  font-size: 2.525em;
}

@for $i from 1 through $cardsTotal {
  $index: $i - 1;
  $translation: $cardsPositionOffset * $index;
  $scale: 1 - ($cardsScaleOffset * $index);

  .card:nth-child(#{$i}) {
    z-index: $cardsTotal - $index;
    opacity: 1;
    transform: translateY($translation) scale($scale);

    @if $i == 3 {
      color: $c-red-25;
      background-color: $c-red-25;
    } @else if $i == 2 {
      color: $c-red-50;
      background-color: $c-red-50;
    }

    @if $i != 1 {
      background-image: none;

      @include after() {
        @include sizing(0 0);
      }
    }
  }
}
</style>

