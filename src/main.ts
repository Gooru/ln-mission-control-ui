import Vue from 'vue';
import 'mutationobserver-shim';
import '@/registerServiceWorker';
import '@/plugins/bootstrap-vue';
import '@/plugins/vue-lazyload';
import '@/plugins/vee-validation';
import App from '@/app/app.vue';
import router from '@/routers/router';
import store from '@/store';
import { authService } from '@/providers/services/auth/auth';
import i18n from '@/i18n';

Vue.config.productionTip = false;

const application = {
  router,
  store,
  i18n,
  beforeCreate() {
    authService.doAuthentication();
  },
  render: (h: any) => h(App),
};

new Vue(application).$mount('#mission-control');
