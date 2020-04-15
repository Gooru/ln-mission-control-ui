import {ResourceModel} from '@/models/content/resource';
import { taxonomySerializer } from './taxonomy';
import { sessionService } from '@/providers/services/auth/session';
import { DEFAULT_IMAGES_PATH } from '@/utils/constants';
import { getResourceFormat } from '@/utils/utils';

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

  public nomalizeSearchResources(payload: any) {
    const resultSet = {
      searchResults: [],
      hitCount: payload.totalHitCount,
    };
    if (Array.isArray(payload.searchResults)) {
      const results = payload.searchResults.map((result: any) => {
        return this.normalizeResource(result);
      });
      resultSet.searchResults = results;
    }
    return resultSet;
  }

  public normalizeResource(resource: any) {
    const cdnUrls = sessionService.getCdnUrl();
    const contentCdnUrl = cdnUrls.content_cdn_url;
    const basePath =  contentCdnUrl;
    const appRootPath = window.location.href; // configuration appRootPath
    const userBasePath = cdnUrls.user_cdn_url;

    const format = getResourceFormat(resource.contentSubFormat);
    const taxonomyInfo =
      (resource.taxonomySet &&
        resource.taxonomySet.curriculum &&
        resource.taxonomySet.curriculum.curriculumInfo) ||
      [];
    return {
      id: resource.gooruOid,
      title: resource.title,
      description: resource.description,
      format,
      url: resource.url,
      subformat: resource.contentSubFormat,
      thumbnailUrl: resource.thumbnail
        ? basePath + resource.thumbnail
        : DEFAULT_IMAGES_PATH.unit,
      creator: resource.creator
        ? taxonomySerializer.normalizeOwner(resource.creator)
        : null,
      owner: resource.user ? taxonomySerializer.normalizeOwner(resource.user) : null,
      type: 'resource',
      standards: taxonomySerializer.normalizeTaxonomyArray(taxonomyInfo, false),
      taxonomySubject: resource.taxonomySet
        ? resource.taxonomySet.subject
        : null,
      taxonomyCourse: resource.taxonomySet ? resource.taxonomySet.course : null,
      taxonomyDomain: resource.taxonomySet ? resource.taxonomySet.domain : null,
      publishStatus: resource.publishStatus,
      publisher: resource.publisher ? resource.publisher[0] : null,
      efficacy: resource.efficacy ? resource.efficacy : null,
      relevance: resource.relevance ? resource.relevance : null,
      engagement: resource.engagement ? resource.engagement : null,
    };
  }

}

export const resourceSerializer = ResourceSerializer.instance;
