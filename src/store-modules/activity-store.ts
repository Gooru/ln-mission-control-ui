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
        summaryResource: {},
        summaryQuestion: {},
        learnerContent: {},
        courseCatalog: {},
        collectionCatalog: {},
        assessmentCatalog: {},
        resourceCatalog: {},
        questionCatalog: {},
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

        courseCatalogSearch(state: any, course: any) {
            state.courseCatalog = course;
        },

        collectionCatalogSearch(state: any, collection: any) {
            state.collectionCatalog = collection;
        },

        assessmentCatalogSearch(state: any, assessment: any) {
            state.assessmentCatalog = assessment;
        },
        resourceCatalogSearch(state: any, resource: any) {
            state.resourceCatalog = resource;
        },
        questionCatalogSearch(state: any, question: any) {
            state.questionCatalog = question;
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
            const list = [
                searchAPI.fetchAggregationResources(params.resource),
                searchAPI.fetchAggregationQuestion(params.question),
            ];
            axios.all(list).then((response) => {
                context.commit('fetchSummaryCatalog', response);
            });
        },

        fetachLearnerContent(context: any, params: any) {
            const list = Object.keys(params).map((param: any) => {
                return searchAPI.fetachLearnerContent(params[param]);
            });
            axios.all(list).then((response) => {
                context.commit('fetachLearnerContent', response);
            });
        },

        courseCatalogSearch(context: any, params: any) {
            searchAPI.fetchCourse(params)
                .then((courses) => {
                    context.commit('courseCatalogSearch', courses);
                });
        },

        collectionCatalogSearch(context: any, params: any) {
            searchAPI.fetchCollections(params)
                .then((collection) => {
                    context.commit('collectionCatalogSearch', collection);
                });
        },
        assessmentCatalogSearch(context: any, params: any) {
            searchAPI.fetchAssessment(params)
                .then((assessment) => {
                    context.commit('assessmentCatalogSearch', assessment);
                });
        },
        resourceCatalogSearch(context: any, params: any) {
            searchAPI.fetchResources(params)
                .then((resource) => {
                    context.commit('resourceCatalogSearch', resource);
                });
        },
        questionCatalogSearch(context: any, params: any) {
            searchAPI.fetchQuestions(params)
                .then((question) => {
                    context.commit('questionCatalogSearch', question);
                });
        },
    },
});
