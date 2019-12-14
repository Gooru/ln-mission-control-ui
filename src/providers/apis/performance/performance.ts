import { http } from '@/providers/apis/http';
import { performanceSerializer } from '@/providers/serializers/performance/performance';


export class PerfomanceAPI {

    private static INSTANCE = new PerfomanceAPI();

    private namespace = 'api/reports/v1';

    private namespace1 = 'api/ds/users/v2/nc/atc/pvc';

    static get instance() {
        return this.INSTANCE;
    }

    public fetchStateByCountryID(params: any, data: any): Promise<any> {
        const endpoint = `${this.namespace}/${params.api_type}/countries/${params.country_id}`;
        const headers = http.getTokenHeaders();
        return http.get(endpoint, headers, data).then((response) => {
            return performanceSerializer.serializeState(response.data);
        });
    }

    public fetchDistrictByStateID(params: any, data: any): Promise<any> {
        const endpoint =
        `${this.namespace}/${params.api_type}/countries/${params.country_id}/states/${params.state_id}`;
        const headers = http.getTokenHeaders();
        return http.get(endpoint, headers, data).then((response) => {
            return performanceSerializer.serializeDistrict(response.data);
        });
    }

    public fetchSchoolByDistrictID(params: any, data: any): Promise<any> {
        const endpoint = `${this.namespace}/${params.api_type}/groups/${params.group_id}`;
        const headers = http.getTokenHeaders();
        return http.get(endpoint, headers, data).then((response) => {
            return performanceSerializer.serializeSchool(response.data);
        });
    }

    public fetchClassBySchoolID(params: any, data: any): Promise<any> {
        const endpoint = `${this.namespace}/${params.api_type}/schools/${params.school_id}`;
        const headers = http.getTokenHeaders();
        return http.get(endpoint, headers).then((response) => {
            return performanceSerializer.serializeClass(response.data);
        });
    }

    public fetchStudentsByClassID(data: any): Promise<any> {
        const endpoint = `${this.namespace1}`;
        const headers = http.getTokenHeaders();
        return http.get(endpoint, headers, data).then((response) => {
            return response.data;
        });
    }

    public fetchCountrySubject(params: any, data: any): Promise<any> {
        const endpoint = `${this.namespace}/${params.api_type}/countries/${params.country_id}/subjects`;
        const headers = http.getTokenHeaders();
        return http.get(endpoint, headers, data).then((response) => {
            return performanceSerializer.serializeSubject(response.data);
        });
    }

}

export const perfomanceAPI = PerfomanceAPI.instance;
