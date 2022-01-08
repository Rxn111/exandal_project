import Vue from 'vue'
import { ToastPlugin, ModalPlugin, BootstrapVue, BootstrapVueIcons  } from 'bootstrap-vue';
import App from './App.vue'
import router from './router'

// Bootstrap 
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(ToastPlugin);
Vue.use(ModalPlugin);
Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
