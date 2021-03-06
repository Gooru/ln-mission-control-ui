import Vue from 'vue';
import Router from 'vue-router';
import AppLayout from '@/layouts/app-layout/app-layout.vue';
import AppHeaderLayout from '@/layouts/app-header-layout/app-header-layout.vue';
import { sessionService, SessionService } from '@/providers/services/auth/session';
import 'pace-progressbar';

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
        component: () => import('@/routers/views/network/network.vue'),
        meta: { isRequiredAuth: true },
      },
      {
        path: '/network/countries/:id/:name?',
        name: 'countries-with-state',
        component: () => import('@/routers/views/network/drill-down/drill-down.vue'),
        meta: { isRequiredAuth: true },
      },
      {
        path: '/network/partners/type/:type',
        name: 'network-partners-type',
        component: () => import('@/routers/views/network/partners/partners-type/partners-type.vue'),
        meta: { isRequiredAuth: true },
      },
      {
        path: '/network/partners/:id',
        name: 'network-partners-profile',
        component: () => import('@/routers/views/network/partners/partner-profile/partner-profile.vue'),
        meta: { isRequiredAuth: true },
      },
      {
        path: '/competency',
        name: 'competency',
        beforeEnter() {
          window.location.href = '/research/competency/tree';
        },
      },
      {
        path: '/catalog',
        name: 'catalog',
        beforeEnter() {
          window.location.href = '/research/catalog';
        },
      },
      {
        path: '/learners',
        name: 'learners',
        component: () => import('@/routers/views/learners/learners.vue'),
        meta: {isRequiredAuth: true},
      },
      {
        path: '/learners/:id',
        name: 'learners-proficiency',
        component: () => {
           // this need to move view
          return import('@/components/proficiency/learner-facets-proficiency/learner-facets-proficiency.vue');
        },
        meta: { isRequiredAuth: true },
      },
      {
        path: '/console',
        name: 'console',
        component: () => import('@/routers/views/console/console.vue'),
        meta: {isRequiredAuth: true},
      },
      {
        path: '/console/:name',
        name: 'console-section',
        component: () => import('@/routers/views/console/lrs/lrs.vue'),
        meta: {isRequiredAuth: true},
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
        component: () => import('@/routers/views/login/login.vue'),
      },
      {
        path: '/logout',
        name: 'logout',
        beforeEnter() {
          sessionService.deleteSession();
          window.location.href = '/login';
        },
      },
    ],
  },
];

const router = new Router({
  linkExactActiveClass: 'active',
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior: (to, from, savedPosition) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ x: 0, y: 0 });
      }, 500);
    });
  },
});


router.beforeEach((to, from, next) => {
  if (to.meta.isRequiredAuth && !sessionService.isAuthorized()) {
    next({ path: '/login', query: { redirect: to.fullPath } });
  } else {
    next();
  }
});

export default router;
