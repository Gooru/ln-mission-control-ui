import { FacetMatrix } from '@/models/proficiency/facet-matrix';
import { FacetMatrixCount } from '@/models/proficiency/facet-matrix-count';
import { CompetencyPrerequisite } from '@/models/proficiency/competency-prerequisite';

export class CompetencySerializer {

  static get instance() {
    return this.INSTANCE;
  }
  private static INSTANCE = new CompetencySerializer();

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

  public serializePrerequisites(prerequisites: CompetencyPrerequisite[]) {
    const serializedPrerequisites: CompetencyPrerequisite[] =
      prerequisites.map( (prerequisite) => {
        const serializedPrerequisite: CompetencyPrerequisite = {
          code: prerequisite.code,
          id: prerequisite.id,
          title: prerequisite.title,
        };
        return serializedPrerequisite;
      });
    return serializedPrerequisites;
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
