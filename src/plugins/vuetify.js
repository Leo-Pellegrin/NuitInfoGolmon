/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    themes: {
      light: {
        colors: {
          color1Gradiant1: '#F1A3A9',
          color2Gradiant1: '#F9BBAC',
          color1Gradiant2: '#394635',
          color2Gradiant2: '#FCED98',
        },
      },
      dark: {
        colors: {
          color1Gradiant1: '#013972',
          color2Gradiant1: '#116897',
          color1Gradiant2: '#01151A',
          color2Gradiant2: '#06283E',
        },
      },
        
    },
  },
})
