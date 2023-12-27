import Vue from 'vue';
import App from './App.vue';
import router from './router/router';
import store from './store/store';
import vuetify from './plugins/vuetify';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import i18n from './plugins/i18n';
import Swal from 'sweetalert2';

Vue.config.productionTip = false;

Vue.prototype.$swal = Swal;

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: h => h(App)
}).$mount('#app')
