import axois from 'axios';
import { lookupAPI } from '@/providers/apis/lookup/lookup';
export default {
    namespaced: true,

    state: {
        dok: [],
        license: [],
        publisher: [],
        audience: [],
        centurySkills: [],
    },


    mutations: {
        fetchActivityDetails(state: any, activity: any) {
            state.centurySkills = activity[0];
            state.dok = activity[1];
            state.license = activity[2];
            state.audience = activity[3];
        },
    },

    actions: {

        fetchActivityDetails(context: any) {
            axois.all([
                lookupAPI.readCenturySkills(),
                lookupAPI.readDepthOfKnowledgeItems(),
                lookupAPI.readLicenses(),
                lookupAPI.readAudiences(),
            ]).then((data) => {
                context.commit('fetchActivityDetails', data);
            });
        },

    },
};
