import { http } from '@/providers/apis/http';
import { searchSerializer } from '@/providers/serializers/search/search';

export class SearchAPI {
  private static INSTANCE = new SearchAPI();

  static get instance() {
      return this.INSTANCE;
  }

  private namespace: string = '/gooru-search/rest/v2/search';

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
  public fetchCollections(term = '*', params: any= {}) {
      const endpoint = `${this.namespace}/scollection`;
      const headers = http.getTokenHeaders();
      const data = Object.assign({
          'q': term,
          'flt.collectionType': params.contentType,
          'flt.publishStatus': 'published',
          'start': params.start,
          'length': params.length,
      }, params.filters);
      return http.get(endpoint, headers, data).then((response) => {
          // Note :- currently used only for total counts
          return response.data;
      });
  }

  /**
   * @function fetchResources can used to fetch resources and questions
   * @param term
   * @param params
   */
  public fetchResources(term = '*', params: any= {}) {
      const endpoint = `${this.namespace}/resource`;
      const headers = http.getTokenHeaders();
      const resourceflt = params.contentType === 'resource' ?
       {'flt.contentFormat': params.contentType} : {'flt.resourceFormat': params.contentType};
      const options = {
          'q': term,
          'flt.publishStatus': 'published',
          'start': params.start,
          'length': params.length,
          'scopeKey': params.isMyContent ? 'my-content' : '',
      };
      const data = {...options, ...resourceflt};
      return http.get(endpoint, headers, data).then((response) => {
          // Note :- currently used only for total counts
          return response.data;
      });
  }

  /**
   * @function fetchCourse can used to fetch courses
   * @param term
   * @param params
   */
  public fetchCourse(term = '*', params: any= {}) {
      const endpoint = `${this.namespace}/course`;
      const headers = http.getTokenHeaders();
      const data = {
          q: term,
          start: params.start,
          length: params.length,
          scopeKey: params.isMyContent ? 'my-content' : '',
      };
      return http.get(endpoint, headers, data).then((response) => {
          // Note :- currently used only for total counts
          return response.data;
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
      const data = {
          q: term,
          start: params.start,
          length: params.length,
          scopeKey: params.isMyContent ? 'my-content' : '',
      };
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
  public fetachLearnerContent(term = '*', params: any= {}) {
      const endpoint = `${this.namespace}/learning-maps`;
      const headers = http.getTokenHeaders();
      const data = {
          q: term,
          startAt: params.start || 0,
          length: params.length || 0,
          scopeKey: params.isMycontent ? 'my-content' : 'open-all',
      };

      return http.get(endpoint, headers, data).then((response) => {
          // Note :- currently used only for total counts
          return response.data;
      });
  }

}

export const searchAPI = SearchAPI.instance;
