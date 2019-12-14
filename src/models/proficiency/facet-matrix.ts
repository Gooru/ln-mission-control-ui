import { FacetMatrixCount } from '@/models/proficiency/facet-matrix-count';
export interface FacetMatrix {
  classificationCode: string;
  classificationName: string;
  classificationSeq: number;
  competencyStats: FacetMatrixCount[];
  subjectCode: string;
  subjectName: string;
  subjectSeq: number;
}
