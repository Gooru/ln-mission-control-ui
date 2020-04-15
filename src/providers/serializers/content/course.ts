import { CourseModel } from '@/models/content/course';
import { taxonomySerializer } from './taxonomy';
import { sessionService } from '@/providers/services/auth/session';
import { DEFAULT_IMAGES_PATH, TAXONOMY_LEVELS } from '@/utils/constants';

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

  /**
   * Normalize the Search course response
   *
   * @param payload is the endpoint response in JSON format
   * @returns {Course[]}
   */
  public serializeCourses(payload: any) {
    const resultSet = {
      searchResults: [],
      hitCount: payload.totalHitCount,
    };
    if (Array.isArray(payload.searchResults)) {
      const results = payload.searchResults.map((result: any) => {
        return this.serializeCoursesList(result);
      });
      resultSet.searchResults = results;
    }
    return resultSet;
  }

  /**
   * Normalizes a course
   * @param {*} result
   * @returns {Course}
   */
  public serializeCoursesList(result: any) {
    const cdnUrls = sessionService.getCdnUrl();
    const contentCdnUrl = cdnUrls.content_cdn_url;
    const basePath = contentCdnUrl;
    const appRootPath = window.location.href; // configuration appRootPath
    const thumbnailUrl = result.thumbnail
      ? basePath + result.thumbnail
      : appRootPath + DEFAULT_IMAGES_PATH.COURSE;
    const taxonomyInfo =
      (result.taxonomy &&
        result.taxonomy.curriculum &&
        result.taxonomy.curriculum.curriculumInfo) ||
      [];
    return {
      id: result.id,
      title: result.title,
      audience: result.audience || null,
      description: result.description,
      createdDate: result.addDate,
      thumbnailUrl,
      lastModified: result.lastModified,
      lastModifiedBy: result.lastModifiedBy,
      subject: result.subjectBucket,
      taxonomySubject: result.taxonomy ? result.taxonomy.subject : null,
      taxonomyCourse: result.taxonomy ? result.taxonomy.course : null,
      taxonomyDomain: result.taxonomy ? result.taxonomy.taxonomyDomain : null,
      subjectSequence: result.subjectSequence,
      isVisibleOnProfile: result.visibleOnProfile,
      isPublished: result.publishStatus === 'published',
      unitCount: result.unitCount,
      assessmentCount: result.assessmentCount,
      collectionCount: result.collectionCount,
      lessonCount: result.lessonCount,
      standards: taxonomySerializer
        .normalizeTaxonomyArray(taxonomyInfo, TAXONOMY_LEVELS.COURSE),
      owner: result.owner ? taxonomySerializer.normalizeOwner(result.owner) : null,
      sequence: result.sequence,
      relevance: result.relevance,
      efficacy: result.efficacy,
      engagement: result.engagement,
      type: result.format,
    };
  }


}

export const courseSerializer = CourseSerializer.instance;
