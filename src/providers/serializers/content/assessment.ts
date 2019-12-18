import { sessionService } from '@/providers/services/auth/session';
import {AssessmentModel} from '@/models/content/assessment';
import { DEFAULT_IMAGES_PATH } from '@/utils/constants';

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

}

export const assessmentSerializer = AssessmentSerializer.instance;
