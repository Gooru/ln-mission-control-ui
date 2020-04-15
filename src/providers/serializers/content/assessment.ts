import { sessionService } from '@/providers/services/auth/session';
import {AssessmentModel} from '@/models/content/assessment';
import { DEFAULT_IMAGES_PATH } from '@/utils/constants';
import { taxonomySerializer } from './taxonomy';

export class AssessmentSerializer {
  private static INSTANCE = new AssessmentSerializer();

  static get instance() {
    return this.INSTANCE;
  }

  public serializeAssessment(assessment: any): AssessmentModel {
    const cdnUrls = sessionService.getCdnUrl();
    const contentCdnUrl = cdnUrls.content_cdn_url;
    const thumbnailUrl = assessment.thumbnail ?
      contentCdnUrl + assessment.thumbnail :
      `${window.location.origin}/` + DEFAULT_IMAGES_PATH.assessment;
    const result: AssessmentModel = {
      id: assessment.id,
      title: assessment.title,
      url: assessment.url,
      questionCount: assessment.questionCount,
      description: assessment.learningObjective,
      format: assessment.format || 'assessment',
      efficacy: assessment.efficacy,
      relevance: assessment.relevance,
      engagement: assessment.engagement,
      standards: taxonomySerializer.normalizeTaxonomyObject(assessment.taxonomy),
      creator: taxonomySerializer.normalizeCreator(assessment.creator),
      thumbnailUrl,
    };
    return result;
  }

  public serializeSignatureAssessment(assessment: any): AssessmentModel {
    const cdnUrls = sessionService.getCdnUrl();
    const contentCdnUrl = cdnUrls.content_cdn_url;
    const thumbnailUrl = assessment.thumbnail ?
      contentCdnUrl + assessment.thumbnail :
      `${window.location.origin}/` + DEFAULT_IMAGES_PATH.assessment;
    const result: AssessmentModel = {
      id: assessment.id,
      title: assessment.title,
      thumbnailUrl,
      format: 'signature-assessment',
    };
    return result;
  }


  /**
   * Normalize the Search assessments response
   *
   * @param payload is the endpoint response in JSON format
   * @returns {Assessment[]}
   */
  public normalizeSearchAssessments(payload: any) {
    const resultSet = {
      searchResults: [],
      hitCount: payload.totalHitCount,
    };
    if (Array.isArray(payload.searchResults)) {
      const results = payload.searchResults.map((result: any) =>  {
        return this.normalizeAssessment(result);
      });
      resultSet.searchResults = results;
    }
    return resultSet;
  }

  /**
   * Normalize an assessment
   * @param {*} assessmentData
   * @returns {Assessment}
   */
  public normalizeAssessment(assessmentData: any) {
    const cdnUrls = sessionService.getCdnUrl();
    const contentCdnUrl = cdnUrls.content_cdn_url;
    const basePath =  contentCdnUrl;
    const appRootPath = window.location.href; // configuration appRootPath
    const userBasePath = cdnUrls.user_cdn_url;

    const thumbnailUrl = assessmentData.thumbnail
      ? basePath + assessmentData.thumbnail
      : DEFAULT_IMAGES_PATH.assessment;
    const ownerThumbnailUrl = assessmentData.userProfileImage
      ? userBasePath + assessmentData.userProfileImage
      : DEFAULT_IMAGES_PATH.profile;
    const creatorThumbnailUrl = assessmentData.creatorProfileImage
      ? userBasePath + assessmentData.creatorProfileImage
      : DEFAULT_IMAGES_PATH.profile;
    const taxonomyInfo =
      (assessmentData.taxonomySet &&
        assessmentData.taxonomySet.curriculum &&
        assessmentData.taxonomySet.curriculum.curriculumInfo) ||
      [];
    const course = assessmentData.course || {};
    return {
      id: assessmentData.id,
      title: assessmentData.title,
      description: assessmentData.description,
      type: assessmentData.type ? assessmentData.type : assessmentData.format,
      thumbnailUrl,
      standards: taxonomySerializer.normalizeTaxonomyArray(taxonomyInfo, false),
      publishStatus: assessmentData.publishStatus,
      learningObjectives: assessmentData.languageObjective,
      resourceCount: assessmentData.resourceCount
        ? Number(assessmentData.resourceCount)
        : 0,
      questionCount: assessmentData.questionCount
        ? Number(assessmentData.questionCount)
        : 0,
      remixCount: assessmentData.scollectionRemixCount || 0,
      course: course.title,
      courseId: course.id,
      isVisibleOnProfile: assessmentData.profileUserVisibility,
      owner: {
        id: assessmentData.gooruUId,
        firstName: assessmentData.userFirstName,
        lastName: assessmentData.userLastName,
        avatarUrl: ownerThumbnailUrl,
        username: assessmentData.usernameDisplay,
      },
      creator: {
        id: assessmentData.creatorId,
        firstName: assessmentData.creatorFirstname,
        lastName: assessmentData.creatorLastname,
        avatarUrl: creatorThumbnailUrl,
        username: assessmentData.creatornameDisplay,
      },
      taxonomySet: assessmentData.taxonomySet,
      createdDate: assessmentData.addDate,
      collaboratorIDs: assessmentData.collaboratorIds,
      grade: assessmentData.grade,
      instructionalModel: assessmentData.instructionalMethod,
      lastModified: assessmentData.lastModified,
      lastModifiedBy: assessmentData.lastModifiedBy,
      license: assessmentData.license,
      audience: assessmentData.audience,
      keyPoints: assessmentData.keyPoints,
      efficacy: assessmentData.efficacy ? assessmentData.efficacy : null,
      relevance: assessmentData.relevance ? assessmentData.relevance : null,
      engagement: assessmentData.engagement ? assessmentData.engagement : null,
    };
  }


}

export const assessmentSerializer = AssessmentSerializer.instance;
