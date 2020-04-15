import { isMicroStandardId } from '@/utils/utils';
import { TAXONOMY_LEVELS, DEFAULT_IMAGES_PATH } from '@/utils/constants';
import { sessionService } from '@/providers/services/auth/session';

export class TaxonomySerializer {

  private static INSTANCE = new TaxonomySerializer();

  static get instance() {
    return this.INSTANCE;
  }

  public normalizeTaxonomyObject(payload: any, level = false) {
    const taxonomyData = [];
    if (payload) {
      for (const key in payload) {
        if (payload.hasOwnProperty(key)) {
          const taxonomy = payload[key];
          const isMicroStandard = level
            ? false
            : isMicroStandardId(key);
          taxonomyData.push(
            {
              id: key,
              code: taxonomy.code,
              title: taxonomy.title,
              parentTitle: taxonomy.parentTitle ? taxonomy.parentTitle : '',
              description: taxonomy.description ? taxonomy.description : '',
              frameworkCode: taxonomy.framework_code || taxonomy.frameworkCode,
              taxonomyLevel: level
                ? level
                : isMicroStandard
                  ? TAXONOMY_LEVELS.MICRO
                  : TAXONOMY_LEVELS.STANDARD,
            },
          );
        }
      }
    }
    return taxonomyData;
  }

  /**
   * Normalize the core element taxonomy data into a TaxonomyTagData object
   *
   * @param taxonomyArray - array of taxonomy objects
   * @param {string} level
   * @returns {TaxonomyTagData[]} a TaxonomyTagData array
   */
  public normalizeTaxonomyArray(taxonomyArray: any, level: any) {
    const taxonomyData: any = [];
    if (taxonomyArray && taxonomyArray.length) {
      taxonomyArray.forEach((taxonomyObject: any) => {
        const isMicroStandard = isMicroStandardId(taxonomyObject.internalCode);

        taxonomyData.push({
          id: taxonomyObject.internalCode,
          code: taxonomyObject.code,
          title: taxonomyObject.title,
          parentTitle: taxonomyObject.parentTitle,
          frameworkCode: taxonomyObject.frameworkCode,
          taxonomyLevel: level
            ? level
            : isMicroStandard
              ? TAXONOMY_LEVELS.MICRO
              : TAXONOMY_LEVELS.STANDARD,
        },
        );
      });
    }
    return taxonomyData;
  }

  public normalizeCreator(payload: any) {
    return {
      usernameDisplay: payload.usernameDisplay ? payload.usernameDisplay : '',
      profileImage: payload.profileImage ? payload.profileImage : DEFAULT_IMAGES_PATH.profile,
    };
  }

  /**
   * Normalizes owner
   * @param ownerData
   * @returns {Profile}
   */
  public normalizeOwner(ownerData: any) {
    const serializer = this;
    const cdnUrls = sessionService.getCdnUrl();
    const contentCdnUrl = cdnUrls.user_cdn_url;
    const basePath = contentCdnUrl;
    const thumbnailUrl = ownerData.profileImage
      ? basePath + ownerData.profileImage
      : DEFAULT_IMAGES_PATH.profile;

    return {
      id: ownerData.gooruUId || ownerData.id,
      firstName: ownerData.firstName,
      lastName: ownerData.lastName,
      username: ownerData.usernameDisplay,
      avatarUrl: thumbnailUrl,
    };
  }

}

export const taxonomySerializer = TaxonomySerializer.instance;
