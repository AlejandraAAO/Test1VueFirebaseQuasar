import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
//requerir vuefire y utilizarlo
import { rtdbPlugin } from 'vuefire';

Vue.use(rtdbPlugin);

import './quasar'



new Vue({
  render: h => h(App),
}).$mount('#app')
