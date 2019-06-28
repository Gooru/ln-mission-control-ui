import { http } from '@/providers/apis/http';

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

  public getCountries(): Promise<any> {
    const endpoint = `${window.location.origin}/${this.mapDataSetNamespace}/countries.json`;
    return new Promise((resolve) => {
      return http.get(endpoint).then((response) => {
        resolve(response.data);
      });
    });
  }

  public getCountriesRegion(): Promise<any> {
    const endpoint = `${window.location.origin}/${this.mapDataSetNamespace}/countries-region.json`;
    return new Promise((resolve) => {
      return http.get(endpoint).then((response) => {
        resolve(response.data);
      });
    });
  }
}

export const mapDataSetAPI = MapDataSetAPI.instance;
