import { http } from '@/providers/apis/http';
import { performanceSerializer } from '@/providers/serializers/performance/performance';


export class PerfomanceAPI {

  private static INSTANCE = new PerfomanceAPI();

  private namespace = 'api/reports/v1/performance';

  static get instance() {
    return this.INSTANCE;
  }

  public fetchStateByCountryID(params: any): Promise<any> {
    const endpoint = `this.namespace/countries/${params.country_id}`;
    const headers = http.getTokenHeaders();
    return http.get(endpoint, headers).then((response) => {
        return performanceSerializer.serializeState(response.data);
    });
  }

  public fetchDistrictByStateID(params: any): Promise<any> {
    const endpoint = `this.namespace/countries/${params.country_id}/states/${params.state_id}`;
    const headers = http.getTokenHeaders();
    return http.get(endpoint, headers).then((response) => {
        return performanceSerializer.serializeDistrict(response.data);
    });
  }

  public fetchSchoolByDistrictID(params: any): Promise<any> {
    const endpoint = `this.namespace/countries/${params.country_id}/states/${params.state_id}`;
    const headers = http.getTokenHeaders();
    return http.get(endpoint, headers).then((response) => {
        return performanceSerializer.serializeDistrict(response.data);
    });
  }


}

export const perfomanceAPI = PerfomanceAPI.instance;
