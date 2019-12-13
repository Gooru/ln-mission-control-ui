import { FacetMatrix } from '@/models/proficiency/facet-matrix';
import { FacetMatrixCount } from '@/models/proficiency/facet-matrix-count';

export class CompetencySerializer {
  private static INSTANCE = new CompetencySerializer();

  static get instance() {
    return this.INSTANCE;
  }

  public serializeDomainCompetencyMatrix(domainCompetencyMatrix: any) {
    const userDomainCompetencyMatrix = domainCompetencyMatrix.userCompetencyMatrix;
    return userDomainCompetencyMatrix;
  }

  public serializeMatrixCoOrdinates(matrixCoOrdinates: any) {
    return matrixCoOrdinates;
  }

  public serializeFacetsCompetencyMatrix(facetsCompetencyMatrix: any) {
    const serializer = this;
    const userSubjectCompetencyMatrix = facetsCompetencyMatrix.userSubjectCompetencyMatrix;
    const serializedFacetsCompetencyMatrix: FacetMatrix[] =
      userSubjectCompetencyMatrix.map( (subjectCompetencyMatrix: any) => {
      const serializedFacetCompetencyMatrix: FacetMatrix = {
        classificationCode: subjectCompetencyMatrix.classificationCode,
        classificationName: subjectCompetencyMatrix.classificationName,
        classificationSeq: subjectCompetencyMatrix.classificationSeq,
        competencyStats: serializer.normalizeFacetCompetencyMatrixCount(subjectCompetencyMatrix.competencyStats),
        subjectCode: subjectCompetencyMatrix.subjectCode,
        subjectName: subjectCompetencyMatrix.subjectName,
        subjectSeq: subjectCompetencyMatrix.subjectSeq,
      };
      return serializedFacetCompetencyMatrix;
    });
    return serializedFacetsCompetencyMatrix;
  }

  private normalizeFacetCompetencyMatrixCount(facetCompetencyStats: any) {
    const serializedFacetCompetencyMatrixCount: FacetMatrixCount[] =
      facetCompetencyStats.map( (facetCompetencyStat: any) => {
      const facetMatrixCount: FacetMatrixCount = {
        competencyCount: facetCompetencyStat.competencyCount,
        competencyStatus: facetCompetencyStat.competencyStatus,
      };
      return facetMatrixCount;
    });
    return serializedFacetCompetencyMatrixCount;
  }

}

export const competencySerializer = CompetencySerializer.instance;
