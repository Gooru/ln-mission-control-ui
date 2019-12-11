import {QuestionModel} from '@/models/content/question';

export class QuestionSerializer {
  private static INSTANCE = new QuestionSerializer();

  static get instance() {
    return this.INSTANCE;
  }

  public serializeQuestion(question: any): QuestionModel {
    const result: QuestionModel = {
      id: question.id,
      title: question.title,
      description: question.description,
      subformat: question.contentSubFormat,
    };
    return result;
  }

}

export const questionSerializer = QuestionSerializer.instance;
