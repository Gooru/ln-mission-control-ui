import { isMicroStandardId } from '@/utils/utils';
import { TAXONOMY_LEVELS, DEFAULT_IMAGES_PATH } from '@/utils/constants';

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

  public normalizeCreator(payload: any) {
    return {
      usernameDisplay: payload.usernameDisplay ? payload.usernameDisplay : '',
      profileImage: payload.profileImage ? payload.profileImage : DEFAULT_IMAGES_PATH.profile,
    };
  }

}

export const taxonomySerializer = TaxonomySerializer.instance;
