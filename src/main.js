import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import Snack from './Snack.vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false
Vue.use(BootstrapVue);

new Vue({
  render: h => h(Snack)
}).$mount('#snack')
