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


  /**
   * Normalize the Search collections response
   *
   * @param payload is the endpoint response in JSON format
   * @returns {Collection[]}
   */
  public normalizeSearchCollection(payload: any) {
    const serializer = this;
    const resultSet = {
      searchResults: [],
      hitCount: payload.totalHitCount,
    };
    if (Array.isArray(payload.searchResults)) {
      const results = payload.searchResults.map((result: any) => {
        return serializer.normalizeCollection(result);
      });
      resultSet.searchResults = results;
    }
    return resultSet;
  }

  /**
   * Normalize a collection
   * @param {*} collectionData
   * @returns {Collection}
   */
  public normalizeCollection(collectionData: any) {
    const cdnUrls = sessionService.getCdnUrl();
    const contentCdnUrl = cdnUrls.content_cdn_url;
    const basePath =  contentCdnUrl;
    const appRootPath = window.location.href; // configuration appRootPath
    const userBasePath = cdnUrls.user_cdn_url;

    const thumbnailUrl = collectionData.thumbnail
      ? basePath + collectionData.thumbnail
      : DEFAULT_IMAGES_PATH.collection;
    const userThumbnailUrl = collectionData.userProfileImage
      ? userBasePath + collectionData.userProfileImage
      : DEFAULT_IMAGES_PATH.profile;
    const creatorThumbnailUrl = collectionData.creatorProfileImage
      ? userBasePath + collectionData.creatorProfileImage
      : DEFAULT_IMAGES_PATH.profile;
    const taxonomyInfo =
      (collectionData.taxonomySet &&
        collectionData.taxonomySet.curriculum &&
        collectionData.taxonomySet.curriculum.curriculumInfo) ||
      [];

    const course = collectionData.course || {};
    return {
      id: collectionData.id,
      title: collectionData.title,
      description: collectionData.description,
      type: collectionData.type ? collectionData.type : collectionData.format,
      thumbnailUrl,
      standards: taxonomySerializer.normalizeTaxonomyArray(collectionData, false),
      publishStatus: collectionData.publishStatus,
      learningObjectives: collectionData.languageObjective,
      resourceCount: collectionData.resourceCount || 0,
      questionCount: collectionData.questionCount || 0,
      remixCount: collectionData.scollectionRemixCount || 0,
      course: course.title,
      courseId: course.id,
      isVisibleOnProfile: collectionData.profileUserVisibility,
      owner: {
        id: collectionData.gooruUId,
        firstName: collectionData.userFirstName,
        lastName: collectionData.userLastName,
        avatarUrl: userThumbnailUrl,
        username: collectionData.usernameDisplay,
      },
      creator: {
        id: collectionData.creatorId,
        firstName: collectionData.creatorFirstname,
        lastName: collectionData.creatorLastname,
        avatarUrl: creatorThumbnailUrl,
        username: collectionData.creatornameDisplay,
      },
      taxonomySet: collectionData.taxonomySet,
      createdDate: collectionData.addDate,
      collaboratorIDs: collectionData.collaboratorIds,
      grade: collectionData.grade,
      instructionalModel: collectionData.instructionalMethod,
      lastModified: collectionData.lastModified,
      lastModifiedBy: collectionData.lastModifiedBy,
      license: collectionData.license,
      audience: collectionData.audience,
      keyPoints: collectionData.keyPoints,
      efficacy: collectionData.efficacy ? collectionData.efficacy : null,
      relevance: collectionData.relevance ? collectionData.relevance : null,
      engagement: collectionData.engagement ? collectionData.engagement : null,
    };
  }

}

export const collectionSerializer = CollectionSerializer.instance;
