import { http } from '@/providers/apis/http';
import { Observable } from 'rxjs/Observable';
import { appConfigSerializer } from '@/providers/serializers/app/app-config';
import { AppConfigModel } from '@/models/app/app-config';
import 'rxjs/Rx';

/**
 *
 * This Auth API Provider is responsible for all authentication related API's.
 *
 */
export class AppConfigAPI {

  private static INSTANCE = new AppConfigAPI();

  static get instance() {
    return this.INSTANCE;
  }

  private appConfigNamespace: string = 'config';

  public getAppConfiguration(): Observable<AppConfigModel> {
    const endpoint = `${window.location.origin}/${this.appConfigNamespace}/${window.location.hostname}.json`;
    return http.get(endpoint).map((ajaxResponse) => {
      const res = ajaxResponse.response;
      return appConfigSerializer.appConfigModelSerializer(res);
    });
  }
}

export const appConfigAPI = AppConfigAPI.instance;
