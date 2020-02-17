import {LessonModel} from '@/models/content/lesson';
import { sessionService } from '@/providers/services/auth/session';
import { DEFAULT_IMAGES_PATH } from '@/utils/constants';
import { taxonomySerializer } from './taxonomy';

export class LessonSerializer {
  private static INSTANCE = new LessonSerializer();

  static get instance() {
    return this.INSTANCE;
  }

  public serializeLesson(lesson: any): LessonModel {
    const cdnUrls = sessionService.getCdnUrl();
    const contentCdnUrl = cdnUrls.content_cdn_url;
    const thumbnailUrl = lesson.thumbnail ?
      contentCdnUrl + lesson.thumbnail :
        `${window.location.origin}/` + DEFAULT_IMAGES_PATH.unit;
    const result: LessonModel = {
      id: lesson.id,
      title: lesson.title,
      assessmentCount: lesson.assessmentCount,
      collectionCount: lesson.collectionCount,
      description: lesson.learningObjective,
      format: lesson.format || 'lesson',
      efficacy: lesson.efficacy,
      relevance: lesson.relevance,
      engagement: lesson.engagement,
      standards: taxonomySerializer.normalizeTaxonomyObject(lesson.taxonomy),
      creator: taxonomySerializer.normalizeCreator(lesson.creator),
      thumbnailUrl,
    };
    return result;
  }

}

export const lessonSerializer = LessonSerializer.instance;
