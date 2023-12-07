<template>
    <div style="min-height: 100%;">
        <v-layout class="d-flex justify-space-around">
            <!-- Bouton Faux-->
            <div class="d-flex align-center">
                <v-btn 
                    @click="handleLeftButtonClick"
                    style="right:-150px"
                    elevation="5"
                    icon="mdi-close"
                    size="x-large"
                >
                </v-btn>
            </div>
            <div class="d-flex align-center">
                <GameCardsStack
                    :cards="visibleCards"
                    @cardAccepted="handleCardAccepted"
                    @cardRejected="handleCardRejected"
                    @cardSkipped="handleCardSkipped"
                    @hideCard="removeCardFromDeck"
                />

                <!-- 
                    <v-card 
                        class="
                            position-relative 
                            mt-16
                            rotate-card-2
                        " 
                        width="400"
                        height="600"
                        style="
                            right: -460px;
                            top: -30px
                        "
                        elevation="5"
                    >
                        <v-card-title>Carte 3</v-card-title>
                    </v-card>
                    <v-card 
                    class="
                        position-relative 
                        mt-16
                        rotate-card-1
                    " 
                    width="400"
                    height="600"
                    style="
                        top: -15px;
                        right: -50px
                    "
                    elevation="5"
                >
                    <v-card-title>Carte 2</v-card-title>
                </v-card>
                <v-card 
                    class="mt-16"
                    width="400"
                    height="600"
                    style="
                        right: 370px;
                    "
                    elevation="5"
                >
                    <v-card-title>Carte 1</v-card-title>
                </v-card>
            -->

            </div>
            <!-- Bouton Vrai-->
            <div class="d-flex align-center">
                <v-btn
                    @click="handleLeftButtonClick"
                    style="left:-150px"
                    elevation="5"
                    icon="mdi-check"
                    size="x-large"
                >
                </v-btn>
            </div>
        </v-layout>
    </div>
    <v-row class="bottom-right-button-row">
        <v-btn 
            @click="handleBottomRightButtonClick" 
            class="bottom-right-button"
            icon="mdi-chat"
            size="large"
            ></v-btn>
    </v-row>
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
        position: absolute;
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
