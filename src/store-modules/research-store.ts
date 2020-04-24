import { researchAPI } from '@/providers/apis/research/research';
import { ResearchModel } from '@/models/research/research';
import { unique, arrUnique } from '@/utils/utils';
/**
 * Store module for research page
 */
export default {
    namespaced: true,

    state: {
        researchProjects: [],
        researchCategories: [],
        reasearchTeams: [],
    },

    mutations: {
        /**
         * Handle the state params
         * @param state
         * @param projects
         */
        fetchResearchProjects(state: any, projects: ResearchModel[]) {
            state.researchCategories = unique(projects, 'category');
            state.reasearchTeams = arrUnique(projects);
            state.researchProjects = projects;
        },
    },

    actions: {
        /**
         * call the fetch research project list
         * @param context
         */
        fetchResearchProjects(context: any) {
            researchAPI.fetchProjects().then((projects) => {
                context.commit('fetchResearchProjects', projects);
            });
        },
    },
};
