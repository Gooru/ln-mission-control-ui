import { TaxonomyModel } from './taxonomy';

export interface AssessmentModel {
  id: string;
  title: string;
  url?: string;
  format?: string;
  questionCount?: number;
  description?: string;
  thumbnailUrl: string;
  efficacy?: number;
  engagement?: number;
  relevance?: number;
  standards?: TaxonomyModel[];
  creator?: any;
}
