import {UnitModel} from '@/models/content/unit';
import { sessionService } from '@/providers/services/auth/session';
import { DEFAULT_IMAGES_PATH } from '@/utils/constants';
import { taxonomySerializer } from './taxonomy';

export class UnitSerializer {
  private static INSTANCE = new UnitSerializer();

  static get instance() {
    return this.INSTANCE;
  }

  public serializeUnit(unit: any): UnitModel {
    const cdnUrls = sessionService.getCdnUrl();
    const contentCdnUrl = cdnUrls.content_cdn_url;
    const thumbnailUrl = unit.thumbnail ?
      contentCdnUrl + unit.thumbnail :
        `${window.location.origin}/` + DEFAULT_IMAGES_PATH.unit;
    const result: UnitModel = {
      id: unit.id,
      title: unit.title,
      assessmentCount: unit.assessmentCount,
      collectionCount: unit.collectionCount,
      description: unit.learningObjective,
      format: unit.format || 'unit',
      efficacy: unit.efficacy,
      relevance: unit.relevance,
      engagement: unit.engagement,
      standards: taxonomySerializer.normalizeTaxonomyObject(unit.taxonomy),
      creator: taxonomySerializer.normalizeCreator(unit.creator),
      thumbnailUrl,
    };
    return result;
  }

}

export const unitSerializer = UnitSerializer.instance;
