import Vue from 'vue';
import Vuex from 'vuex';
import activityStore from '@/store-modules/activity-store';
import lookupStore from '@/store-modules/lookup-store';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
  },
  mutations: {

  },
  actions: {

  },
  modules: {
    activityStore,
    lookupStore,
  },
});
