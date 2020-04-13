import { taxonomyAPI } from '@/providers/apis/taxonomy/taxonomy';
import { ClassificationModel } from '@/models/taxonomy/classification';
import { SubjectModel } from '@/models/taxonomy/subject';
import { searchAPI } from '@/providers/apis/search/search';
import axios from 'axios';

export default ({
    namespaced: true,
    state: {
        categoryList: [],
        subjectList: [],
        courseList: [],
        summaryResource: [],
        summaryQuestion: [],
        learnerContent: [],

    },
    mutations: {
        fetchCategory(state: any, category: ClassificationModel[]) {
            state.categoryList = category;
        },
        fetchSubject(state: any, subject: SubjectModel[]) {
            state.subjectList = subject;
        },
        fetchCourse(state: any, course: any) {
            state.courseList = course;
        },
        fetchSummaryCatalog(state: any, catalog: any) {
            state.summaryResource = catalog[0];
            state.summaryQuestion = catalog[1];
        },

        fetachLearnerContent(state: any, content: any) {
            state.learnerContent = content;
        },
    },
    actions: {
        fetchCategory({commit}: {commit: any}) {
            taxonomyAPI.fetchTaxonomyClassifications().then((classification) => {
                commit('fetchCategory', classification);
            });
        },

        fetchSubject({commit}: {commit: any}, categoryId: string) {
            taxonomyAPI.fetchTaxonomySubjects(categoryId).then((subjects) => {
                commit('fetchSubject', subjects);
            });
        },

        fetchCourse({commit}: {commit: any}, subject: any) {
            taxonomyAPI.fetchTaxonomyCourse(subject).then((courses) => {
                commit('fetchCourse', courses);
            });
        },
        fetcSummaryCatalog(context: any, params: any) {
            axios.all([
                searchAPI.fetchResources(params.resource),
                searchAPI.fetchResources(params.question),
            ]).then((response) => {
                context.commit('fetchSummaryCatalog', response);
            });
        },

        fetachLearnerContent(context: any, params: any) {
            searchAPI.fetachLearnerContent(params)
                    .then((content) => {
                        context.commit('fetachLearnerContent', content);
                    });
        },
    },
});
