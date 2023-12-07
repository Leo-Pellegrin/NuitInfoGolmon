<template>
    <div>
        <v-layout 
            class="d-flex justify-center" 
            style="
                overflow: visible;
                margin-top: 30px;
            ">
            <!-- Bouton Faux-->
            <div class="d-flex align-center">
                <v-btn 
                    @click="handleLeftButtonClick"
                    elevation="5"
                    icon="mdi-close"
                    size="x-large"
                    style="top: 270px"
                >
                </v-btn>
            </div>
            <div>
                <GameCardsStack
                    :cards="visibleCards"
                    @cardAccepted="handleCardAccepted"
                    @cardRejected="handleCardRejected"
                    @cardSkipped="handleCardSkipped"
                    @hideCard="removeCardFromDeck"
                />
            </div>
            <!-- Bouton Vrai-->
            <div class="d-flex align-center">
                <v-btn
                    @click="handleLeftButtonClick"
                    style="top: 270px"
                    elevation="5"
                    icon="mdi-check"
                    size="x-large"
                >
                </v-btn>
                <v-btn 
                    @click="handleBottomRightButtonClick" 
                    class="bottom-right-button"
                    icon="mdi-chat"
                    size="large"
                    style="top:550px"
                ></v-btn>
            </div>
        </v-layout>
    </div>
</template>

<script>
    import GameCardsStack from "../components/GameCardStack.vue";

    export default {
    name: "App",
    components: {
        GameCardsStack
    },

    data() {
        return {
            visibleCards: ["Test", "Vue.js", "Webpack"]
        };
    },

    methods: {
        handleCardAccepted() {
        console.log("handleCardAccepted");
        },
        handleCardRejected() {
        console.log("handleCardRejected");
        },
        handleCardSkipped() {
        console.log("handleCardSkipped");
        },
        removeCardFromDeck() {
        this.visibleCards.shift();
        }
    }
    };
</script>

<style scoped>
    .position-relative {
        position: relative;
    }
    .rotate-card-1 {
        transform: rotate(5deg);
    }
    .rotate-card-2 {
        transform: rotate(10deg);
    }
    .bottom-right-button-row {
        bottom: 10px;
        right: 10px;
        margin: 40px;
    }
</style>

<style lang="scss">
    @import "../styles/mixins.scss";

    #app {
        font-family: "Avenir", Helvetica, Arial, sans-serif;
        text-align: center;
    }
</style>
