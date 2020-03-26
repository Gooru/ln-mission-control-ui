import { sessionService } from '@/providers/services/auth/session';
import {CollectionModel} from '@/models/content/collection';
import { DEFAULT_IMAGES_PATH } from '@/utils/constants';
import { taxonomySerializer } from './taxonomy';

export class CollectionSerializer {
  private static INSTANCE = new CollectionSerializer();

  static get instance() {
    return this.INSTANCE;
  }

  public serializeCollection(collection: any): CollectionModel {
    const cdnUrls = sessionService.getCdnUrl();
    const contentCdnUrl = cdnUrls.content_cdn_url;
    const thumbnailUrl = collection.thumbnail ?
      contentCdnUrl + collection.thumbnail :
        `${window.location.origin}/` + DEFAULT_IMAGES_PATH.collection;
    const result: CollectionModel = {
      id: collection.id,
      title: collection.title,
      url: collection.url,
      questionCount: collection.questionCount || 0,
      resourceCount: collection.resourceCount || 0,
      description: collection.learningObjective,
      format: collection.format || 'collection',
      efficacy: collection.efficacy,
      relevance: collection.relevance,
      engagement: collection.engagement,
      standards: taxonomySerializer.normalizeTaxonomyObject(collection.taxonomy),
      creator: taxonomySerializer.normalizeCreator(collection.creator),
      thumbnailUrl,
    };
    return result;
  }

  public serializeSignatureCollection(collection: any): CollectionModel {
    const cdnUrls = sessionService.getCdnUrl();
    const contentCdnUrl = cdnUrls.content_cdn_url;
    const thumbnailUrl = collection.thumbnail ?
      contentCdnUrl + collection.thumbnail :
        `${window.location.origin}/` + DEFAULT_IMAGES_PATH.collection;
    const result: CollectionModel = {
      id: collection.id,
      title: collection.title,
      thumbnailUrl,
      format: 'signature-collection',
    };
    return result;
  }

}

export const collectionSerializer = CollectionSerializer.instance;
