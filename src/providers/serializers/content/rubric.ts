import {RubricModel} from '@/models/content/rubric';

export class RubricSerializer {
  private static INSTANCE = new RubricSerializer();

  static get instance() {
    return this.INSTANCE;
  }

  public serializeRubric(rubric: any): RubricModel {
    const result: RubricModel = {
      id: rubric.id,
      title: rubric.title,
      description: rubric.learningObjective,
    };
    return result;
  }

}

export const rubricSerializer = RubricSerializer.instance;
