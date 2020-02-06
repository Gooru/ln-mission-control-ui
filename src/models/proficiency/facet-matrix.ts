import { FacetMatrixCount } from '@/models/proficiency/facet-matrix-count';
import { FacetCompetenciesCount } from '@/models/proficiency/facet-competencies-count';
export interface FacetMatrix {
  classificationCode: string;
  classificationName: string;
  classificationSeq: number;
  competencyStats: FacetMatrixCount[];
  competenciesCount?: FacetCompetenciesCount[];
  totalCompetenciesCount?: number;
  subjectCode: string;
  subjectName: string;
  subjectSeq: number;
}
