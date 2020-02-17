import {CourseModel} from '@/models/content/course';
import { taxonomySerializer } from './taxonomy';
import { sessionService } from '@/providers/services/auth/session';
import { DEFAULT_IMAGES_PATH } from '@/utils/constants';

export class CourseSerializer {
  private static INSTANCE = new CourseSerializer();

  static get instance() {
    return this.INSTANCE;
  }

  public serializeCourse(course: any): CourseModel {
    const cdnUrls = sessionService.getCdnUrl();
    const contentCdnUrl = cdnUrls.content_cdn_url;
    const thumbnailUrl = course.thumbnail ?
      contentCdnUrl + course.thumbnail :
        `${window.location.origin}/` + DEFAULT_IMAGES_PATH.unit;
    const result: CourseModel = {
      id: course.id,
      title: course.title,
      description: course.description,
      format: course.format || 'course',
      efficacy: course.efficacy,
      relevance: course.relevance,
      engagement: course.engagement,
      standards: taxonomySerializer.normalizeTaxonomyObject(course.taxonomy),
      creator: taxonomySerializer.normalizeCreator(course.creator),
      unitCount: course.unitCount,
      thumbnailUrl,
    };
    return result;
  }

}

export const courseSerializer = CourseSerializer.instance;
