import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
      posts: {
        logo: 'https://nile-tenants.s3-us-west-1.amazonaws.com/partners/77ba26e3-1bc6-4fca-9eed-bdacae71c849.png',
        website: null,
        countries: [
        {
        id: 101,
        code: 'IN',
        name: 'India',
        },
        ],
        partner_id: 61,
        total_users: 4488,
        partner_name: 'Ideaphora',
        total_others: 0,
        total_classes: 874,
        tenant_manager: true,
        total_students: 4368,
        total_teachers: 120,
        videos: ['https://youtu.be/xpyFkDros_o'],
        states: [ {
         id: 1023,
         code: 'CA',
         country_code: 'US',
         name: 'california',
         },
        ],
        partner_type: 'implementation_partners',
        intro: 'simply dummy text of the printing and typesetting industry.',
        categories_usage: [
        {
         code: 'K12IN',
         name: 'K12 IND',
         total_count: 123,
        }],
        subjects_usage: [
        {
         code: 'K12IN.MA',
         name: 'Math',
         total_count: 1231,
        }],
        content_types_usage: [{
         content_type: 'video',
         total_count: 100,
        }],
        },
  },
  mutations: {

  },
  actions: {

  },
});
