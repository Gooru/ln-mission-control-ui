import axios from 'axios';
import { searchAPI } from '@/providers/apis/search/search';

export default {
    namespaced: true,
    state: {
        googleSearch: [],
        bingSearch: [],
        gooruSearch: [],
    },

    mutations: {

        otherSearch(state: any, searchContent: any) {
            state.googleSearch = searchContent[0];
            state.bingSearch = searchContent[1];
        },

        comparativeSearch(state: any, search: any) {
            state.gooruSearch = search;
        },

    },

    actions: {

        otherSearch(context: any, params: any) {
            axios.all([
                searchAPI.googleSearch(params.q, params.start),
                searchAPI.bingSearch(params.q, params.start),
            ]).then((search) => {
                context.commit('otherSearch', search);
            });
        },

        comparativeSearch(context: any, params: any) {
            searchAPI.fetachLearnerContent(params)
                .then((search) => {
                    context.commit('comparativeSearch', search);
                });
        },
    },
};
