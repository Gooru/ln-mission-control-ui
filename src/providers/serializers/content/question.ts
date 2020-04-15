import {QuestionModel} from '@/models/content/question';
import { taxonomySerializer } from './taxonomy';
import { sessionService } from '@/providers/services/auth/session';
import { DEFAULT_IMAGES_PATH, DEFAULT_CATALOG_STRING } from '@/utils/constants';

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

  public normalizeSearchQuestions(payload: any) {
    const resultSet =  {
      searchResults: [],
      hitCount: payload.totalHitCount,
    };
    if (Array.isArray(payload.searchResults)) {
      const results = payload.searchResults.map((result: any) => {
        return this.normalizeQuestion(result);
      });
      resultSet.searchResults =  results;
    }
    return resultSet;
  }

  /**
   * Normalizes a question
   * @param {*} result
   * @returns {Question}
   */
  public normalizeQuestion(questionData: any) {
    const taxonomyInfo =
      (questionData.taxonomySet &&
        questionData.taxonomySet.curriculum &&
        questionData.taxonomySet.curriculum.curriculumInfo) ||
      [];
    const format = DEFAULT_CATALOG_STRING[questionData.contentSubFormat].name;
    return {
      id: questionData.gooruOid,
      title: questionData.title,
      subformat: questionData.contentSubFormat,
      description: questionData.description
        ? questionData.description
        : questionData.text,
      type: questionData.contentFormat ? questionData.contentFormat : null,
      format,
      publisher: null, // TODO missing publisher at API response,
      thumbnailUrl: questionData.thumbnail,
      creator: questionData.creator
        ? taxonomySerializer.normalizeOwner(questionData.creator)
        : null,
      owner: questionData.user
        ? taxonomySerializer.normalizeOwner(questionData.user)
        : null,
      standards: taxonomySerializer.normalizeTaxonomyArray(taxonomyInfo, false),
      taxonomySubject: questionData.taxonomySet
        ? questionData.taxonomySet.subject
        : null,
      taxonomyCourse: questionData.taxonomySet
        ? questionData.taxonomySet.course
        : null,
      taxonomyDomain: questionData.taxonomySet
        ? questionData.taxonomySet.domain
        : null,
      efficacy: questionData.efficacy ? questionData.efficacy : null,
      relevance: questionData.relevance ? questionData.relevance : null,
      engagement: questionData.engagement ? questionData.engagement : null,
      contentSubFormat: questionData.contentSubFormat,
    };
  }


}

export const questionSerializer = QuestionSerializer.instance;
