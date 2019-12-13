import { http } from '@/providers/apis/http';
import { performanceSerializer } from '@/providers/serializers/performance/performance';


export class PerfomanceAPI {

    private static INSTANCE = new PerfomanceAPI();

    private namespace = 'stubs';

    static get instance() {
        return this.INSTANCE;
    }

    public fetchStateByCountryID(params: any): Promise<any> {
        const endpoint = `${window.location.origin}/${this.namespace}/countries/${params.country_id}.json`;
        const headers = http.getTokenHeaders();
        return http.get(endpoint, headers).then((response) => {
            return performanceSerializer.serializeState(response.data);
        });
    }

    public fetchDistrictByStateID(params: any): Promise<any> {
        const endpoint =
        `${window.location.origin}/${this.namespace}/countries/${params.country_id}/states/${params.state_id}.json`;
        const headers = http.getTokenHeaders();
        return http.get(endpoint, headers).then((response) => {
            return performanceSerializer.serializeDistrict(response.data);
        });
    }

    public fetchSchoolByDistrictID(params: any): Promise<any> {
        const endpoint = `${window.location.origin}/${this.namespace}/groups/${params.group_id}.json`;
        const headers = http.getTokenHeaders();
        return http.get(endpoint, headers).then((response) => {
            return performanceSerializer.serializeSchool(response.data);
        });
    }

    public fetchClassBySchoolID(params: any): Promise<any> {
        const endpoint = `${window.location.origin}/${this.namespace}/schools/${params.school_id}.json`;
        const headers = http.getTokenHeaders();
        return http.get(endpoint, headers).then((response) => {
            return performanceSerializer.serializeClass(response.data);
        });
    }

    public fetchClassRoomsByClassID() {
        return [];
    }

}

export const perfomanceAPI = PerfomanceAPI.instance;
