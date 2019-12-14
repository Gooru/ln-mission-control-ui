import { LearnerVector } from '@/models/proficiency/learner-vector';
import { LearnerPreference } from '@/models/proficiency/learner-preference';

export class LearnerSerializer {
  private static INSTANCE = new LearnerSerializer();

  static get instance() {
    return this.INSTANCE;
  }

  public serializeLearnerVector(vectorDataPoints: any): LearnerVector[] {
    const vectorPointKeys = Object.keys(vectorDataPoints);
    const serializedLearnerVectorPoints: LearnerVector[] = vectorPointKeys.map((pointKey: string) => {
      const serializedLearnerVectorPoint: LearnerVector = {
        label: pointKey,
        value: vectorDataPoints[pointKey],
      };
      return serializedLearnerVectorPoint;
    });
    return serializedLearnerVectorPoints;
  }

  public serializeLearnerPreferences(preferences: any): LearnerPreference[] {
    const preferenceKeys = Object.keys(preferences);
    const serializedLearnerPreferences: LearnerPreference[] = preferenceKeys.map( (preferenceKey: string) => {
      const serializedLearnerPreference: LearnerPreference = {
        label: preferenceKey,
        value: preferences[preferenceKey],
      };
      return serializedLearnerPreference;
    });
    return serializedLearnerPreferences;
  }
}

export const learnerSerializer = LearnerSerializer.instance;
