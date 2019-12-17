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

    public fetchStateCompetencyByCountryID(params: any, data: any): Promise<any> {
        const endpoint = `${this.namespace}/competency/countries/${params.country_id}`;
        const headers = http.getTokenHeaders();
        return http.get(endpoint, headers, data).then((response) => {
            return performanceSerializer.serializeState(response.data);
        });
    }

    public fetchDistrictCompetencyByStateID(params: any, data: any): Promise<any> {
        const endpoint =
        `${this.namespace}/competency/countries/${params.country_id}/states/${params.state_id}`;
        const headers = http.getTokenHeaders();
        return http.get(endpoint, headers, data).then((response) => {
            return performanceSerializer.serializeDistrict(response.data);
        });
    }

    public fetchSchoolCompetencyByDistrictID(params: any, data: any): Promise<any> {
        const endpoint = `${this.namespace}/competency/groups/${params.group_id}`;
        const headers = http.getTokenHeaders();
        return http.get(endpoint, headers, data).then((response) => {
            return performanceSerializer.serializeSchool(response.data);
        });
    }

    public fetchClassCompetencyBySchoolID( params: any, data: any): Promise<any> {
        const endpoint = `${this.namespace}/competency/schools/${params.school_id}`;
        const headers = http.getTokenHeaders();
        return http.get(endpoint, headers, data).then((response) => {
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

    public fetchCountrySubject(params: any, data: any): Promise<any> {
        const endpoint = `${this.namespace}/performance/countries/${params.country_id}/subjects`;
        const headers = http.getTokenHeaders();
        return http.get(endpoint, headers, data).then((response) => {
            return performanceSerializer.serializeSubject(response.data);
        });
    }

    public fetchStatePerformanceByCountryID(params: any, data: any): Promise<any> {
        const endpoint = `${this.namespace}/performance/countries/${params.country_id}`;
        const headers = http.getTokenHeaders();
        return http.get(endpoint, headers, data).then((response) => {
            return performanceSerializer.serializeState(response.data);
        });
    }

    public fetchDistrictPerformanceByStateID(params: any, data: any): Promise<any> {
        const endpoint =
        `${this.namespace}/performance/countries/${params.country_id}/states/${params.state_id}`;
        const headers = http.getTokenHeaders();
        return http.get(endpoint, headers, data).then((response) => {
            return performanceSerializer.serializeDistrict(response.data);
        });
    }

    public fetchSchoolPerformanceByDistrictID(params: any, data: any): Promise<any> {
        const endpoint = `${this.namespace}/performance/groups/${params.group_id}`;
        const headers = http.getTokenHeaders();
        return http.get(endpoint, headers, data).then((response) => {
            return performanceSerializer.serializeSchool(response.data);
        });
    }

    public fetchClassPerformanceBySchoolID(params: any, data: any): Promise<any> {
        const endpoint = `${this.namespace}/performance/schools/${params.school_id}`;
        const headers = http.getTokenHeaders();
        return http.get(endpoint, headers, data).then((response) => {
            return performanceSerializer.serializeClass(response.data);
        });
    }

    public fetchCardsDatabyCountryLevel(params: any) {
        const endpoint = `${this.namespaceStub}/stats/countries/${params.country_id}.json`;
        const headers = http.getTokenHeaders();
        return http.get(endpoint, headers).then((response) => {
            return response.data;
        });
    }


}

export const perfomanceAPI = PerfomanceAPI.instance;
