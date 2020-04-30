import { http } from '@/providers/apis/http';
import { searchSerializer } from '@/providers/serializers/search/search';
import { courseSerializer } from '@/providers/serializers/content/course';
import { collectionSerializer } from '@/providers/serializers/content/collection';
import { assessmentSerializer } from '@/providers/serializers/content/assessment';
import { resourceSerializer } from '@/providers/serializers/content/resource';
import { questionSerializer } from '@/providers/serializers/content/question';
import { GOOGLE_API_KEY, SEARCH_API } from '@/utils/constants';

export class SearchAPI {
    private static INSTANCE = new SearchAPI();

    static get instance() {
        return this.INSTANCE;
    }

    private namespace: string = 'gooru-search/rest/v2/search';

    private pedagogyNamespace: string = 'gooru-search/rest/v1/pedagogy-search';

    public fetchLearningMapContents(competencyCode: string) {
        const namespace = this.pedagogyNamespace;
        const endpoint = `${namespace}/learning-maps/standard/${competencyCode}`;
        const headers = http.getTokenHeaders();
        const options = {
            isDisplayCode: true,
        };
        return http.get(endpoint, headers).then((response) => {
            return searchSerializer.serializeLearningMapData(response.data);
        });
    }

    /**
     * @function fetchResources can used to fetch resources and questions
     * @param term
     * @param params
     */
    public fetchAggregationResources(params: any = {}) {
        const endpoint = `${this.namespace}/resource`;
        const headers = http.getTokenHeaders();
        const options = Object.assign({
            'q': '*',
            'isCrossWalk': false,
            'start': params.start,
            'length': params.length,
            'aggBy': 'contentSubFormat',
            'flt.publisherQualityIndicatorGTE': 2,
            'flt.audience': 'All Students,Teachers',
            'flt.contentFormat': 'resource',
        }, params);
        return http.get(endpoint, headers, options).then((response) => {
            return searchSerializer.serializeAggregation(response.data);
        });
    }

    /**
     * @function fetchResources can used to fetch resources and questions
     * @param term
     * @param params
     */
    public fetchAggregationQuestion(params: any = {}) {
        const endpoint = `${this.namespace}/resource`;
        const headers = http.getTokenHeaders();
        const options = Object.assign({
            'q': '*',
            'isCrossWalk': false,
            'start': params.start,
            'length': params.length,
            'aggBy': 'contentSubFormat',
            'flt.audience': 'All Students,Teachers',
            'flt.resourceFormat': 'question',
        }, params);
        return http.get(endpoint, headers, options).then((response) => {
            return searchSerializer.serializeAggregation(response.data);
        });
    }

    /**
     * @function fetchCollections can used to fetch collection , assessment ,  offline-activity contents.
     * @param term
     * @param params
     */
    public fetchCollections(params: any = {}) {
        const endpoint = `${this.namespace}/scollection`;
        const headers = http.getTokenHeaders();
        const data = Object.assign({
            'q': '*',
            'isCrossWalk': false,
            'start': params.start,
            'length': params.length,
            'flt.collectionType': 'collection',
        }, params);
        return http.get(endpoint, headers, data).then((response) => {
            // Note :- currently used only for total counts
            return collectionSerializer.normalizeSearchCollection(response.data);
        });
    }

    /**
     * @function fetchCollections can used to fetch collection , assessment ,  offline-activity contents.
     * @param term
     * @param params
     */
    public fetchAssessment(params: any = {}) {
        const endpoint = `${this.namespace}/scollection`;
        const headers = http.getTokenHeaders();
        const data = Object.assign({
            'q': '*',
            'isCrossWalk': false,
            'start': params.start,
            'length': params.length,
            'flt.collectionType': 'assessment',
        }, params);
        return http.get(endpoint, headers, data).then((response) => {
            // Note :- currently used only for total counts
            return assessmentSerializer.normalizeSearchAssessments(response.data);
        });
    }

    /**
     * @function fetchCourse can used to fetch courses
     * @param term
     */
    public fetchCourse(params: any = {}) {
        const endpoint = `${this.namespace}/course`;
        const headers = http.getTokenHeaders();
        const data = Object.assign({
            q: '*',
            start: params.start,
            length: params.length,
            isCrossWalk: false,
        }, params);
        return http.get(endpoint, headers, data).then((response) => {
            // Note :- currently used only for total counts
            return courseSerializer.serializeCourses(response.data);
        });
    }

    /**
     * @function fetchResources can used to fetch resources
     * @param term
     */
    public fetchResources(params: any = {}) {
        const endpoint = `${this.namespace}/resource`;
        const headers = http.getTokenHeaders();
        const options = Object.assign({
            'q': '*',
            'isCrossWalk': false,
            'start': params.start,
            'length': params.length,
            'flt.publisherQualityIndicatorGTE': 2,
            'flt.audience': 'All Students,Teachers',
            'flt.contentFormat': 'resource',
        }, params);
        return http.get(endpoint, headers, options).then((response) => {
            return resourceSerializer.nomalizeSearchResources(response.data);
        });
    }

    /**
     * @function fetchQuestions can used to fetch questions
     * @param term
     */
    public fetchQuestions(params: any = {}) {
        const endpoint = `${this.namespace}/resource`;
        const headers = http.getTokenHeaders();
        const options = Object.assign({
            'q': '*',
            'isCrossWalk': false,
            'start': params.start,
            'length': params.length,
            'flt.audience': 'All Students,Teachers',
            'flt.resourceFormat': 'question',
        }, params);
        return http.get(endpoint, headers, options).then((response) => {
            return questionSerializer.normalizeSearchQuestions(response.data);
        });
    }

    /**
     * @function fetchRubrics can used to fetch rubrics
     * @param term
     */
    public fetchRubrics(term = '*', params: any = {}) {
        const endpoint = `${this.namespace}/rubric`;
        const headers = http.getTokenHeaders();
        const data = Object.assign({
            q: term,
            start: params.start,
            length: params.length,
            isCrossWalk: false,
        }, params);
        return http.get(endpoint, headers, data).then((response) => {
            // Note :- currently used only for total counts
            return response.data;
        });
    }

    /**
     * @function fetachLearnerContent can used to fetch library content
     * @param term
     */
    public fetachLearnerContent(params: any = {}) {
        const endpoint = `${this.pedagogyNamespace}/learning-maps`;
        const headers = http.getTokenHeaders();
        const data = Object.assign({
            q: '*',
            length: params.length || 0,
        }, params);

        return http.get(endpoint, headers, data).then((response) => {
            return searchSerializer.normalizeSearchLearningMapsContentInfo(response.data.contents);
        });
    }

    /**
     * @function googleSearch
     * Method to search google content
     */
    public googleSearch(query: string, start = 1) {
        const key = GOOGLE_API_KEY[Math.floor(Math.random() * GOOGLE_API_KEY.length)];
        const url = `${SEARCH_API.baseUrl}?key=${key}&cx=${SEARCH_API.googleCx}&q=${query}&start=${start}`;
        return http.get(url).then((response) => {
            return response.data;
        });
    }

    /**
     * @function bingSearch
     * Method to search bing content
     */
    public bingSearch(query: string, start = 1) {
        const key = GOOGLE_API_KEY[Math.floor(Math.random() * GOOGLE_API_KEY.length)];
        const url = `${SEARCH_API.baseUrl}?key=${key}&cx=${SEARCH_API.bingCx}&q=${query}&start=${start}`;
        return http.get(url).then((response) => {
            return response.data;
        });
    }

}

export const searchAPI = SearchAPI.instance;
