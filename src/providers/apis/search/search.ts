import { http } from '@/providers/apis/http';
import { searchSerializer } from '@/providers/serializers/search/search';

export class SearchAPI {
  private static INSTANCE = new SearchAPI();

  static get instance() {
      return this.INSTANCE;
  }

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

}

export const searchAPI = SearchAPI.instance;
