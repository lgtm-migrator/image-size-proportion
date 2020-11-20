import Vue from 'vue'
import App from './App.vue'
import Oruga from '@oruga-ui/oruga'
import '@oruga-ui/oruga/dist/oruga.css'
import './registerServiceWorker'

Vue.use(Oruga)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
