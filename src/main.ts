import 'mutationobserver-shim';
import Vue from 'vue';
import '@/plugins/bootstrap-vue';
import App from '@/app/app.vue';
import router from '@/routes/router';
import store from '@/store';
import '@/registerServiceWorker';
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
