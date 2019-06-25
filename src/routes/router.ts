import Vue from 'vue';
import Router from 'vue-router';
import AppLayout from '@/layouts/app-layout/app-layout.vue';
import AppHeaderLayout from '@/layouts/app-header-layout/app-header-layout.vue';
import { sessionService } from '@/providers/services/auth/session';

Vue.use(Router);

const routes = [
  {
    path: '/',
    redirect: 'network',
    component: AppHeaderLayout,
    children: [
      {
        path: '/network',
        name: 'network',
        component: () => import('@/routes/views/network/network.vue'),
        meta: { isRequiredAuth: true },
      },
      {
        path: '/competency',
        name: 'competency',
        component: () => import('@/routes/views/competency/competency.vue'),
        meta: { isRequiredAuth: true },
      },
      {
        path: '/catalog',
        name: 'catalog',
        component: () => import('@/routes/views/catalog/catalog.vue'),
        meta: { isRequiredAuth: true },
      },
      {
        path: '/console',
        name: 'console',
        component: () => import('@/routes/views/console/console.vue'),
        meta: { isRequiredAuth: true },
      },
    ],
  },
  {
    path: '/',
    redirect: 'login',
    component: AppLayout,
    children: [
      {
        path: '/login',
        name: 'login',
        component: () => import('@/routes/views/login/login.vue'),
      },
    ],
  },
];

const router = new Router({
  linkExactActiveClass: 'active',
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.isRequiredAuth && !sessionService.isAuthorized()) {
    next({ path: '/login', query: { redirect: to.fullPath } });
  } else {
    next();
  }
});

export default router;
