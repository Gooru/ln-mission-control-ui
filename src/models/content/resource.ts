import { TaxonomyModel } from './taxonomy';

export interface ResourceModel {
  id: string;
  title: string;
  description?: string;
  subformat: string;
  thumbnailUrl?: string;
  efficacy?: number;
  engagement?: number;
  relevance?: number;
  standards?: TaxonomyModel[];
  creator?: any;
  url?: string;
  format?: string;
  isVisibleOnProfile?: boolean;
}
