import {ResourceModel} from '@/models/content/resource';
import { taxonomySerializer } from './taxonomy';
import { sessionService } from '@/providers/services/auth/session';
import { DEFAULT_IMAGES_PATH } from '@/utils/constants';

export class ResourceSerializer {
  private static INSTANCE = new ResourceSerializer();

  static get instance() {
    return this.INSTANCE;
  }

  public serializeResource(resource: any): ResourceModel {
    const cdnUrls = sessionService.getCdnUrl();
    const contentCdnUrl = cdnUrls.content_cdn_url;
    const thumbnailUrl = resource.thumbnail ?
      contentCdnUrl + resource.thumbnail :
        `${window.location.origin}/` + DEFAULT_IMAGES_PATH.unit;
    const result: ResourceModel = {
      id: resource.id,
      title: resource.title,
      description: resource.description,
      subformat: resource.contentSubFormat,
      format: resource.format || 'resource',
      efficacy: resource.efficacy,
      relevance: resource.relevance,
      engagement: resource.engagement,
      standards: taxonomySerializer.normalizeTaxonomyObject(resource.taxonomy),
      creator: taxonomySerializer.normalizeCreator(resource.creator),
      isVisibleOnProfile: false,
      thumbnailUrl,
    };
    return result;
  }

}

export const resourceSerializer = ResourceSerializer.instance;
