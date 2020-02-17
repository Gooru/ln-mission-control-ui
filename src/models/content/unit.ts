import { TaxonomyModel } from './taxonomy';

export interface UnitModel {
  id: string;
  title: string;
  assessmentCount?: number;
  collectionCount?: number;
  description?: string;
  thumbnailUrl?: string;
  efficacy?: number;
  engagement?: number;
  relevance?: number;
  standards?: TaxonomyModel[];
  creator?: any;
  url?: string;
  format?: string;
}
