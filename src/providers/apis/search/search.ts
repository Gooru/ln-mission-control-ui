import { http } from '@/providers/apis/http';
import { searchSerializer } from '@/providers/serializers/search/search';
import { courseSerializer } from '@/providers/serializers/content/course';
import { collectionSerializer } from '@/providers/serializers/content/collection';

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
   * @function fetchCollections can used to fetch collection , assessment ,  offline-activity contents.
   * @param term
   * @param params
   */
  public fetchCollections(params: any= {}) {
      const endpoint = `${this.namespace}/scollection`;
      const headers = http.getTokenHeaders();
      const data = Object.assign({
          q: '*',
          isCrossWalk: false,
          start: params.start,
          length: params.length,
      }, params);
      return http.get(endpoint, headers, data).then((response) => {
          // Note :- currently used only for total counts
          return collectionSerializer.normalizeSearchCollection(response.data);
      });
  }

  /**
   * @function fetchResources can used to fetch resources and questions
   * @param term
   * @param params
   */
  public fetchResources(params: any= {}) {
      const endpoint = `${this.namespace}/resource`;
      const headers = http.getTokenHeaders();
      const resourceflt = params.contentType === 'resource' ?
       {'flt.contentFormat': params.contentType} : {'flt.resourceFormat': params.contentType};
      const options = Object.assign({
          q: '*',
          isCrossWalk: false,
          start: params.start,
          length: params.length,
      }, params.filters, resourceflt);
      return http.get(endpoint, headers, options).then((response) => {
          return searchSerializer.serializeAggregation(response.data);
      });
  }

  /**
   * @function fetchCourse can used to fetch courses
   * @param term
   * @param params
   */
  public fetchCourse(params: any= {}) {
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
   * @function fetchRubrics can used to fetch rubrics
   * @param term
   * @param params
   */
  public fetchRubrics(term = '*', params: any= {}) {
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
   * @param params
   */
  public fetachLearnerContent(params: any= {}) {
      const endpoint = `${this.pedagogyNamespace}/learning-maps`;
      const headers = http.getTokenHeaders();
      const data = Object.assign({
          q: '*',
          length: params.length || 0,
      }, params);

      return http.get(endpoint, headers, data).then((response) => {
          return response.data.contents;
      });
  }

}

export const searchAPI = SearchAPI.instance;
