import { http } from '@/providers/apis/http';
import { drillDownSerializer } from '@/providers/serializers/drill-down/drill-down';


export class DrillDownAPI {

    private static INSTANCE = new DrillDownAPI();

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
            return drillDownSerializer.serializeCompetency(response.data);
        });
    }

    public fetchDistrictCompetencyByStateID(params: any, data: any): Promise<any> {
        const endpoint =
        `${this.namespace}/competency/countries/${params.country_id}/states/${params.state_id}`;
        const headers = http.getTokenHeaders();
        return http.get(endpoint, headers, data).then((response) => {
            return drillDownSerializer.serializeCompetency(response.data);
        });
    }

    public fetchSchoolCompetencyByDistrictID(params: any, data: any): Promise<any> {
        const endpoint = `${this.namespace}/competency/groups/${params.group_id}`;
        const headers = http.getTokenHeaders();
        return http.get(endpoint, headers, data).then((response) => {
            return drillDownSerializer.serializeCompetency(response.data);
        });
    }

    public fetchClassCompetencyBySchoolID( params: any, data: any): Promise<any> {
        const endpoint = `${this.namespace}/competency/schools/${params.school_id}`;
        const headers = http.getTokenHeaders();
        return http.get(endpoint, headers, data).then((response) => {
            return drillDownSerializer.serializeCompetency(response.data);
        });
    }

    public fetchStudentsByClassID(data: any): Promise<any> {
        const endpoint = `${this.namespace1}`;
        const headers = http.getTokenHeaders();
        return http.get(endpoint, headers, data).then((response) => {
            return drillDownSerializer.serializeClassRooms(response.data);
        });
    }

    public fetchCountrySubject(params: any, data: any): Promise<any> {
        const endpoint = `${this.namespace}/performance/countries/${params.country_id}/subjects`;
        const headers = http.getTokenHeaders();
        return http.get(endpoint, headers, data).then((response) => {
            return drillDownSerializer.serializeSubject(response.data);
        });
    }

    public fetchStatePerformanceByCountryID(params: any, data: any): Promise<any> {
        const endpoint = `${this.namespace}/performance/countries/${params.country_id}`;
        const headers = http.getTokenHeaders();
        return http.get(endpoint, headers, data).then((response) => {
            return drillDownSerializer.serializePerformance(response.data);
        });
    }

    public fetchDistrictPerformanceByStateID(params: any, data: any): Promise<any> {
        const endpoint =
        `${this.namespace}/performance/countries/${params.country_id}/states/${params.state_id}`;
        const headers = http.getTokenHeaders();
        return http.get(endpoint, headers, data).then((response) => {
            return drillDownSerializer.serializePerformance(response.data);
        });
    }

    public fetchSchoolPerformanceByDistrictID(params: any, data: any): Promise<any> {
        const endpoint = `${this.namespace}/performance/groups/${params.group_id}`;
        const headers = http.getTokenHeaders();
        return http.get(endpoint, headers, data).then((response) => {
            return drillDownSerializer.serializePerformance(response.data);
        });
    }

    public fetchClassPerformanceBySchoolID(params: any, data: any): Promise<any> {
        const endpoint = `${this.namespace}/performance/schools/${params.school_id}`;
        const headers = http.getTokenHeaders();
        return http.get(endpoint, headers, data).then((response) => {
            return drillDownSerializer.serializePerformance(response.data);
        });
    }

    public fetchCardsDatabyCountryLevel(params: any) {
        const endpoint = `${this.namespaceStub}/stats/countries/${params.country_id}.json`;
        const headers = http.getTokenHeaders();
        return http.get(endpoint, headers).then((response) => {
            return response.data;
        });
    }

    public fetchCardsDatabyStateLevel(params: any) {
        const endpoint = `${this.namespaceStub}/stats/countries/${params.country_id}/states/${params.state_id}.json`;
        const headers = http.getTokenHeaders();
        return http.get(endpoint, headers).then((response) => {
            return response.data;
        });
    }

    public fetchCardsDatabyDistrictLevel(params: any) {
        const endpoint = `${this.namespaceStub}/stats/groups/${params.group_id}.json`;
        const headers = http.getTokenHeaders();
        return http.get(endpoint, headers).then((response) => {
            return response.data;
        });
    }

    public fetchCardsDatabySchoolLevel(params: any) {
        const endpoint = `${this.namespaceStub}/stats/schools/${params.school_id}.json`;
        const headers = http.getTokenHeaders();
        return http.get(endpoint, headers).then((response) => {
            return response.data;
        });
    }


}

export const drillDownAPI = DrillDownAPI.instance;
