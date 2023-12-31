<template>
    <div>
        <v-layout
            class="d-flex justify-center"
            style="
                overflow: visible;
                margin-top: 30px;
                margin-left: 18px;
            ">
            <!-- Bouton Faux-->
            <div v-if="!finCards()">
                <v-card 
                    size="x-large"
                    style="top: 300px; right: 100px; padding: 20px;"
                    stacked
                    rounded="xl"
                >   
                    <v-icon style="margin-inline: auto;">mdi-gesture-swipe-left</v-icon>
                    <p style="margin-top: 5px;">Faux</p>
                </v-card>
            </div>
            <div v-if="finCards()" class="textFin">
                <p style="font-weight: bold; font-size: 35px;">Bravo !</p>
                <p>Vous avez complété toutes les cartes disponibles pour le moment.</p>
                <p>Revenez bientôt pour découvrir de nouvelles questions passionnantes sur ce sujet !</p>
            </div>
            <div v-else>
                <GameCardsStack
                    :cards="visibleCards"
                    @cardAccepted="handleCardAccepted"
                    @cardRejected="handleCardRejected"
                    @cardSkipped="handleCardSkipped"
                    @hideCard="removeCardFromDeck"
                />
            </div>
            <!-- Bouton Vrai-->
            <div v-if="!finCards()">
                <v-card 
                    size="x-large"
                    style="top: 300px; left: 100px; padding:20px;"
                    stacked
                    rounded="xl"
                >   
                    <v-icon style="margin-inline: auto;">mdi-gesture-swipe-right</v-icon>
                    <p style="margin-top: 5px;">Vrai</p>
                </v-card>        
            </div>
            <v-dialog v-model="dialogVisible" transition="dialog-top-transition" style="margin-inline: 150px;">
                <template v-slot:default="{ isActive }">
                    <v-card rounded="xl">
                        <v-toolbar :color="colorExplication" style="text-align:center">
                            <v-toolbar-title style="font-size: 1.5em; font-weight: bold;">{{ this.TitreExplication }}</v-toolbar-title>
                        </v-toolbar>
                        <v-card-text>
                            <div class="pa-12" style="text-align: center; margin-inline: 20px;">{{ this.textExplication }}</div>
                        </v-card-text>
                    </v-card>
                </template>
            </v-dialog>
        </v-layout>
    </div>
</template>

<script>
    import { ref } from "vue";
    import GameCardsStack from "../components/GameCardStack.vue";

    export default {
        name: "App",
        components: {
            GameCardsStack
        },
        data() {
            return {
                TitreExplication: ref(""),
                colorExplication: ref(""),
                textExplication: ref(""),
                dialogVisible: ref(false),
                visibleCards: [],
                cards :
                    {
                        "questions": [
                            {
                            "id": 1,
                            "question": "Le dioxyde de carbone n'est pas le principal gaz à effet de serre responsable du changement climatique",
                            "réponse": false,
                            "source": "EPA",
                            "explication": "Le dioxyde de carbone (CO2) est le principal gaz à effet de serre produit par les activités humaines, contribuant ainsi au changement climatique en piégeant la chaleur dans l'atmosphère."
                            },
                            {
                            "id": 2,
                            "question": "Les océans absorbent une grande partie du CO2 émis par les activités humaines ?",
                            "réponse": true,
                            "source": "NOAA",
                            "explication": "Les océans jouent un rôle crucial en absorbant une grande partie du dioxyde de carbone (CO2) émis par les activités humaines, ce qui contribue à atténuer les effets du changement climatique."
                            },
                            {
                            "id": 3,
                            "question": "La fonte des glaces polaires peut contribuer à l'élévation du niveau de la mer",
                            "réponse": true,
                            "source": "GIEC",
                            "explication": "La fonte des glaces polaires, telle que celle au Groenland et en Antarctique, contribue à l'élévation du niveau de la mer, ce qui représente une menace pour les régions côtières."
                            },
                            {
                            "id": 4,
                            "question": "Les arbres jouent un rôle mineur dans la régulation du climat de la Terre",
                            "réponse": false,
                            "source": "PNUE",
                            "explication": "Les arbres jouent un rôle crucial dans la régulation du climat en absorbant le dioxyde de carbone (CO2) pendant la photosynthèse, contribuant ainsi à atténuer le changement climatique."
                            },
                            {
                            "id": 5,
                            "question": "L'augmentation des températures mondiales a un impact sur la biodiversité",
                            "réponse": true,
                            "source": "UICN",
                            "explication": "L'augmentation des températures mondiales a un impact sur la biodiversité en modifiant les habitats naturels, en affectant les cycles de reproduction des espèces et en provoquant des changements dans les écosystèmes."
                            },
                            {
                            "id": 6,
                            "question": "Le changement climatique est principalement causé par l'activité humaine",
                            "réponse": true,
                            "source": "GIEC",
                            "explication": "Le changement climatique est principalement causé par l'augmentation des émissions de gaz à effet de serre résultant des activités humaines, telles que la combustion de combustibles fossiles et la déforestation."
                            },
                            {
                            "id": 7,
                            "question": "Les scientifiques sont en désaccord général sur le fait que le climat de la Terre se réchauffe",
                            "réponse": false,
                            "source": "NASA",
                            "explication": "Les scientifiques sont en accord général sur le fait que le climat de la Terre se réchauffe, et il existe un consensus scientifique selon lequel cela est principalement dû à l'activité humaine."
                            },
                            {
                            "id": 8,
                            "question": "La réduction des émissions de gaz à effet de serre n'atténue pas le changement climatique",
                            "réponse": false,
                            "source": "ONU",
                            "explication": "La réduction des émissions de gaz à effet de serre est essentielle pour atténuer le changement climatique en limitant la quantité de chaleur piégée dans l'atmosphère, contribuant ainsi à stabiliser le climat."
                            },
                            {
                            "id": 9,
                            "question": "Les énergies renouvelables ne peuvent pas remplacer les combustibles fossiles pour répondre à nos besoins énergétiques",
                            "réponse": false,
                            "source": "AIE",
                            "explication": "Les énergies renouvelables, telles que l'énergie solaire et éolienne, ont le potentiel de remplacer les combustibles fossiles et de répondre à nos besoins énergétiques de manière plus durable et respectueuse de l'environnement."
                            },
                            {
                            "id": 10,
                            "question": "La déforestation a un impact important sur le climat",
                            "réponse": true,
                            "source": "PNUE",
                            "explication": "La déforestation a un impact significatif sur le climat en réduisant la capacité des forêts à absorber le dioxyde de carbone (CO2) et en contribuant ainsi à l'augmentation des concentrations de gaz à effet de serre dans l'atmosphère."
                            },
                            {
                            "id": 11,
                            "question": "Les activités agricoles contribuent aux émissions de gaz à effet de serre",
                            "réponse": true,
                            "source": "FAO",
                            "explication": "Les activités agricoles contribuent aux émissions de gaz à effet de serre, principalement par le biais de la production de méthane et de dioxyde de carbone résultant de processus tels que la fermentation digestive des animaux et la décomposition des résidus végétaux."
                            },
                            {
                            "id": 12,
                            "question": "Les variations climatiques n'affectent pas les modèles migratoires des animaux ?",
                            "réponse": false,
                            "source": "WWF",
                            "explication": "Les variations climatiques peuvent affecter les modèles migratoires des animaux en modifiant la disponibilité des ressources alimentaires, les conditions météorologiques et les habitats, ce qui peut entraîner des changements dans les routes migratoires."
                            },
                            {
                            "id": 13,
                            "question": "L'utilisation intensive des ressources naturelles aggrave le changement climatique",
                            "réponse": true,
                            "source": "PNUE",
                            "explication": "L'utilisation intensive des ressources naturelles, telle que l'extraction de combustibles fossiles et la déforestation non durable, peut aggraver le changement climatique en contribuant aux émissions accrues de gaz à effet de serre et à la perturbation des écosystèmes."
                            },
                            {
                            "id": 14,
                            "question": "Les océans deviennent plus acides en raison du changement climatique",
                            "réponse": true,
                            "source": "UNESCO",
                            "explication": "Les océans deviennent plus acides en raison du changement climatique, principalement en raison de l'absorption accrue de dioxyde de carbone (CO2), ce qui peut avoir des conséquences néfastes sur les organismes marins, tels que les coraux et les mollusques."
                            },
                            {
                            "id": 15,
                            "question": "Le changement climatique ne provoque pas de phénomènes météorologiques",
                            "réponse": false,
                            "source": "OMM",
                            "explication": "Le changement climatique est lié à l'augmentation des phénomènes météorologiques extrêmes tels que les tempêtes, les inondations et les vagues de chaleur, résultant de modifications dans les modèles climatiques globaux."
                            }
                        ]
                        }
            };
        },
        created() {
        // Initialisation de visibleCards après la création du composant
            this.visibleCards = this.cards.questions.slice(0, 5);
            this.cards.questions = this.cards.questions.slice(5);
        },
        methods: {
            handleCardAccepted() {
                this.textExplication = this.visibleCards[0].explication
                if(this.visibleCards[0].réponse == true){
                    this.TitreExplication = "Bien joué !"
                    this.colorExplication = "green"
                }
                else
                {
                    this.TitreExplication = "Dommage, bien essayé !"
                    this.colorExplication = "red"
                }
                this.dialogVisible = true;
            },
            handleCardRejected() {
                this.textExplication = this.visibleCards[0].explication
                if(this.visibleCards[0].réponse == false){
                    this.TitreExplication = "Bien joué !"
                    this.colorExplication = "green"
                }
                else
                {
                    this.TitreExplication = "Dommage, bien essayé !"
                    this.colorExplication = "red"
                }
                this.dialogVisible = true;
            },
            handleCardSkipped() {
                console.log("handleCardSkipped");
            },
            removeCardFromDeck() {
                this.visibleCards.shift();
                if(this.cards.questions.length > 0){
                    this.visibleCards.push(this.cards.questions[0]);
                    this.cards.questions = this.cards.questions.slice(1);
                }
            },
            finCards(){
                return this.cards.questions.length == 0;
            }
        }
    };
</script>

<style scoped>
    .textFin{
        font-size: 25px;
        text-align: center;
        margin-top: 20%;
        margin-left: 200px;
        margin-right: 250px;
    }
</style>

<style lang="scss">
    @import "../styles/mixins.scss";

    #app {
        font-family: "Avenir", Helvetica, Arial, sans-serif;
        text-align: center;
    }
</style>
