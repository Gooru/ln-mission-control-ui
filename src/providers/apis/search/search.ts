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

  private collectionfetch(params: any) {
    const endpoint = `${this.namespace}/scollection`;
    const constantParams = Object.assign({}, {
      'q': '*',
      'length': 20,
      'startAt': 0,
      'flt.collectionType': 'collection',
      'isCrosswalk': false,
    }, params);
    const headers = http.getTokenHeaders();
    return http.get(endpoint, headers, constantParams).then((response) => {
      return response.data;
    });
  }

}

export const searchAPI = SearchAPI.instance;
