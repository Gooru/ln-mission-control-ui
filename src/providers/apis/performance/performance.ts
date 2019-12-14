import { http } from '@/providers/apis/http';
import { performanceSerializer } from '@/providers/serializers/performance/performance';


export class PerfomanceAPI {

    private static INSTANCE = new PerfomanceAPI();

    private namespace = 'api/reports/v1/performance';

    static get instance() {
        return this.INSTANCE;
    }

    public fetchStateByCountryID(params: any, data: any): Promise<any> {
        const endpoint = `${this.namespace}/countries/${params.country_id}`;
        const headers = http.getTokenHeaders();
        return http.get(endpoint, headers, data).then((response) => {
            return performanceSerializer.serializeState(response.data);
        });
    }

    public fetchDistrictByStateID(params: any, data: any): Promise<any> {
        const endpoint =
        `${this.namespace}/countries/${params.country_id}/states/${params.state_id}`;
        const headers = http.getTokenHeaders();
        return http.get(endpoint, headers, data).then((response) => {
            return performanceSerializer.serializeDistrict(response.data);
        });
    }

    public fetchSchoolByDistrictID(params: any, data: any): Promise<any> {
        const endpoint = `${this.namespace}/groups/${params.group_id}`;
        const headers = http.getTokenHeaders();
        return http.get(endpoint, headers, data).then((response) => {
            return performanceSerializer.serializeSchool(response.data);
        });
    }

    public fetchClassBySchoolID(params: any, data: any): Promise<any> {
        const endpoint = `${this.namespace}/schools/${params.school_id}`;
        const headers = http.getTokenHeaders();
        return http.get(endpoint, headers).then((response) => {
            return performanceSerializer.serializeClass(response.data);
        });
    }

    public fetchClassRoomsByClassID() {
        return [];
    }

    public fetchCountrySubject(params: any, data: any): Promise<any> {
        const endpoint = `${this.namespace}/countries/${params.country_id}/subjects`;
        const headers = http.getTokenHeaders();
        return http.get(endpoint, headers, data).then((response) => {
            return response.data.subjects;
        });
    }

}

export const perfomanceAPI = PerfomanceAPI.instance;
