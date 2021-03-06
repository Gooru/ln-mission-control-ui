import { http } from '@/providers/apis/http';
import { competencySerializer } from '@/providers/serializers/competency/competency';
import { DomainModel } from '@/models/proficiency/domain';
import { FacetMatrix } from '@/models/proficiency/facet-matrix';

export class CompetencyAPI {

  private static INSTANCE = new CompetencyAPI();

  private namespace = 'api/ds/users';

  static get instance() {
    return this.INSTANCE;
  }

  public fetchUserDomainCompetencyMatrix(params: any): Promise<DomainModel[]> {
    const endpoint = `${this.namespace}/v2/tx/competency/matrix/domain`;
    const headers = http.getTokenHeaders();
    return http.get(endpoint, headers, params).then((response) => {
      return competencySerializer.serializeDomainCompetencyMatrix(response.data);
    });
  }

  public getCompetencyMatrixCoordinates(params: any): Promise<DomainModel[]> {
    const endpoint = `${this.namespace}/v2/tx/competency/matrix/coordinates`;
    const headers = http.getTokenHeaders();
    return http.get(endpoint, headers, params).then((response) => {
      return competencySerializer.serializeMatrixCoOrdinates(response.data);
    });
  }

  public fetchAllFacetsCompetencyMatrix<T>(params: any): Promise<FacetMatrix[]> {
    const endpoint = `${this.namespace}/v2/tx/subjects/competency/matrix`;
    const headers = http.getTokenHeaders();
    return http.get(endpoint, headers, params).then((response) => {
      return competencySerializer.serializeFacetsCompetencyMatrix(response.data);
    });
  }



}

export const competencyAPI = CompetencyAPI.instance;
