import { http } from '@/providers/apis/http';
import { LearnerVector } from '@/models/proficiency/learner-vector';
import { LearnerPreference } from '@/models/proficiency/learner-preference';
import { learnerSerializer } from '@/providers/serializers/learner/learner';

export class LearnerAPI {
  private static INSTANCE = new LearnerAPI();

  static get instance() {
      return this.INSTANCE;
  }

  private namespace: string = 'api/ds/users/v2/learner';

  public fetchLearnerVectors(requestParams: any): Promise<LearnerVector[]> {
    const service = this;
    const namespace = service.namespace;
    const endpoint = `${namespace}/vectors`;
    const headers = http.getTokenHeaders();
    return http.get(endpoint, headers, requestParams).then((response) => {
      return learnerSerializer.serializeLearnerVector(response.data);
    });
  }

  public fetchLearnerPreferences(requestParams: any): Promise<LearnerPreference[]> {
    const service = this;
    const namespace = service.namespace;
    const endpoint = `${namespace}/prefs`;
    const headers = http.getTokenHeaders();
    return http.get(endpoint, headers, requestParams).then((response) => {
      return learnerSerializer.serializeLearnerPreferences(response.data);
    });
  }

}

export const learnerAPI = LearnerAPI.instance;
