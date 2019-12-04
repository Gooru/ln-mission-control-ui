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

}

export const competencySerializer = CompetencySerializer.instance;
