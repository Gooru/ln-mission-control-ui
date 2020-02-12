import {QuestionModel} from '@/models/content/question';
import { taxonomySerializer } from './taxonomy';
import { sessionService } from '@/providers/services/auth/session';
import { DEFAULT_IMAGES_PATH } from '@/utils/constants';

export class QuestionSerializer {
  private static INSTANCE = new QuestionSerializer();

  static get instance() {
    return this.INSTANCE;
  }

  public serializeQuestion(question: any): QuestionModel {
    const cdnUrls = sessionService.getCdnUrl();
    const contentCdnUrl = cdnUrls.content_cdn_url;
    const thumbnailUrl = question.thumbnail ?
      contentCdnUrl + question.thumbnail :
        `${window.location.origin}/` + DEFAULT_IMAGES_PATH.unit;
    const result: QuestionModel = {
      id: question.id,
      title: question.title,
      description: question.description,
      subformat: question.contentSubFormat,
      format: question.format || 'question',
      efficacy: question.efficacy,
      relevance: question.relevance,
      engagement: question.engagement,
      standards: taxonomySerializer.normalizeTaxonomyObject(question.taxonomy),
      creator: taxonomySerializer.normalizeCreator(question.creator),
      isVisibleOnProfile: false,
      thumbnailUrl,
    };
    return result;
  }

}

export const questionSerializer = QuestionSerializer.instance;
