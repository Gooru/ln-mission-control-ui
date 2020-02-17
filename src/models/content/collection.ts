import { TaxonomyModel } from './taxonomy';

export interface CollectionModel {
  id: string;
  title: string;
  url?: string;
  format?: string;
  questionCount?: number;
  resourceCount?: number;
  description?: string;
  thumbnailUrl?: string;
  efficacy?: number;
  engagement?: number;
  relevance?: number;
  standards?: TaxonomyModel[];
  creator?: any;
}
