import { http } from '@/providers/apis/http';
import { performanceSerializer } from '@/providers/serializers/performance/performance';


export class PerfomanceAPI {

    private static INSTANCE = new PerfomanceAPI();

    private namespaceStub = `${window.location.origin}/stubs`;

    private namespace = 'api/reports/v1';

    private namespace1 = 'api/ds/users/v2/nc/atc/pvc';

    static get instance() {
        return this.INSTANCE;
    }

    public fetchStateByCountryID(apiType: any, params: any, data: any): Promise<any> {
        const endpoint = `${this.namespaceStub}/${apiType}/countries/${params.country_id}.json`;
        const headers = http.getTokenHeaders();
        return http.get(endpoint, headers).then((response) => {
            return performanceSerializer.serializeState(response.data);
        });
    }

    public fetchDistrictByStateID(apiType: any, params: any, data: any): Promise<any> {
        const endpoint =
        `${this.namespaceStub}/${apiType}/countries/${params.country_id}/states/${params.state_id}.json`;
        const headers = http.getTokenHeaders();
        return http.get(endpoint, headers).then((response) => {
            return performanceSerializer.serializeDistrict(response.data);
        });
    }

    public fetchSchoolByDistrictID(apiType: any, params: any, data: any): Promise<any> {
        const endpoint = `${this.namespaceStub}/${apiType}/groups/${params.group_id}.json`;
        const headers = http.getTokenHeaders();
        return http.get(endpoint, headers).then((response) => {
            return performanceSerializer.serializeSchool(response.data);
        });
    }

    public fetchClassBySchoolID(apiType: any, params: any, data: any): Promise<any> {
        const endpoint = `${this.namespaceStub}/${apiType}/schools/${params.school_id}.json`;
        const headers = http.getTokenHeaders();
        return http.get(endpoint, headers).then((response) => {
            return performanceSerializer.serializeClass(response.data);
        });
    }

    public fetchStudentsByClassID(data: any): Promise<any> {
        const endpoint = `${this.namespace1}`;
        const headers = http.getTokenHeaders();
        return http.get(endpoint, headers, data).then((response) => {
            return performanceSerializer.serializeClassRooms(response.data);
        });
    }

    public fetchCountrySubject(apiType: any, params: any, data: any): Promise<any> {
        const endpoint = `${this.namespace}/performance/countries/${params.country_id}/subjects`;
        const headers = http.getTokenHeaders();
        return http.get(endpoint, headers, data).then((response) => {
            return performanceSerializer.serializeSubject(response.data);
        });
    }

}

export const perfomanceAPI = PerfomanceAPI.instance;
