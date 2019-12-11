import { http } from '@/providers/apis/http';
import { performanceSerializer } from '@/providers/serializers/performance/performance';


export class PerfomanceAPI {

    private static INSTANCE = new PerfomanceAPI();

    private namespace = 'stubs';

    static get instance() {
        return this.INSTANCE;
    }

    public fetchStateByCountryID(): Promise<any> {
        const endpoint = `${window.location.origin}/${this.namespace}/countries/district.json`;
        const headers = http.getTokenHeaders();
        return http.get(endpoint, headers).then((response) => {
            return performanceSerializer.serializeState(response.data);
        });
    }

    public fetchDistrictByStateID(): Promise<any> {
        const endpoint = `${window.location.origin}/${this.namespace}/countries/district.json`;
        const headers = http.getTokenHeaders();
        return http.get(endpoint, headers).then((response) => {
            return performanceSerializer.serializeDistrict(response.data);
        });
    }

    public fetchSchoolByDistrictID(): Promise<any> {
        const endpoint = `${window.location.origin}/${this.namespace}/countries/schools.json`;
        const headers = http.getTokenHeaders();
        return http.get(endpoint, headers).then((response) => {
            return performanceSerializer.serializeSchool(response.data);
        });
    }

    public fetchClassBySchoolID(): Promise<any> {
        const endpoint = `${window.location.origin}/${this.namespace}/countries/classes.json`;
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
