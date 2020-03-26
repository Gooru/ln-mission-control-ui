import { TaxonomyModel } from './taxonomy';

export interface CourseModel {
  id: string;
  title: string;
  thumbnailUrl?: string;
  efficacy?: number;
  description?: string;
  engagement?: number;
  relevance?: number;
  standards?: TaxonomyModel[];
  creator?: any;
  url?: string;
  format?: string;
  unitCount?: number;
}
