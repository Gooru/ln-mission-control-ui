import Vue from 'vue';
import Router from 'vue-router';
import AppNav from '@/components/app-nav/app-nav.vue';
import Network from '@/routes/views/network/network.vue';
import Login from '@/routes/views/login/login.vue';
import { sessionService } from '@/providers/services/auth/session';

Vue.use(Router);



const routes = [
  {
    path: '/',
    name: 'network',
    components: {
      default: AppNav,
      container: Network,
    },
    meta: {isRequiredAuth: true},
  },
  {
    path: '/login',
    name: 'login',
    components: {
      default: AppNav,
      container: Login,
    },
  },

];


const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});


router.beforeEach((to, from, next) => {
  if (to.meta.isRequiredAuth && !sessionService.isAuthorized()) {
    next({ path: '/login', query: { redirect: to.fullPath }});
  } else {
    next();
  }
});

export default router;
