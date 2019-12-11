import Vue from 'vue'

import './styles/quasar.scss'
import lang from 'quasar/lang/es.js'
import '@quasar/extras/material-icons/material-icons.css'
import { Quasar } from 'quasar'

Vue.use(Quasar, {
  config: {},
  /* agregar los x componentes que se requieran */
  components: [
    'QCard',
    'QCardSection',
    'QCardActions',
    'QSeparator',
    'QForm',
    'QInput',
    'QBtn',
    'QTable',
    'QDialog',
    'QAvatar',
    'QPopupEdit'
  ],
  directives: { /* not needed if importStrategy is not 'manual' */ },
  plugins: {
  },
  lang: lang
 })