import { http } from '@/providers/apis/http';
import { learnerSerializer } from '@/providers/serializers/learners/learners';
import LearnerModel from '@/models/learners/learner';
export class LearnerAPI {

  private static INSTANCE = new LearnerAPI();

  static get instance() {
    return this.INSTANCE;
  }

  private namespace: string = 'api/missioncontrol/v1';

  public fetchLearners<T>(params: any): Promise<LearnerModel[]> {
    const endpoint = `${this.namespace}/learners`;
    const headers = http.getTokenHeaders();
    return http.post(endpoint, headers, params).then((response) => {
      return learnerSerializer.serializeLearners(response.data);
    });
  }

}

export const learnerAPI = LearnerAPI.instance;
