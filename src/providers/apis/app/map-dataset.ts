import { http } from '@/providers/apis/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

/**
 *
 * This Map DataSet API Provider is responsible for all map dataset related API's.
 *
 */
export class MapDataSetAPI {

  private static INSTANCE = new MapDataSetAPI();

  static get instance() {
    return this.INSTANCE;
  }

  private mapDataSetNamespace: string = 'map-dataset';

  public getCountries(): Observable<any> {
    const endpoint = `${window.location.origin}/${this.mapDataSetNamespace}/countries.json`;
    return http.get(endpoint).map((ajaxResponse) => {
      const res = ajaxResponse.response;
      return res;
    });
  }

  public getCountriesRegion(): Observable<any> {
    const endpoint = `${window.location.origin}/${this.mapDataSetNamespace}/countries-region.json`;
    return http.get(endpoint).map((ajaxResponse) => {
      const res = ajaxResponse.response;
      return res;
    });
  }
}

export const mapDataSetAPI = MapDataSetAPI.instance;
