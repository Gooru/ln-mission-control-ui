import { http } from '@/providers/apis/http';
import { appConfigSerializer } from '@/providers/serializers/app/app-config';
import { AppConfigModel } from '@/models/app/app-config';


/**
 *
 * This App config API Provider is responsible for all app configuration  related API's.
 *
 */
export class AppConfigAPI {

  private static INSTANCE = new AppConfigAPI();

  static get instance() {
    return this.INSTANCE;
  }

  private appConfigNamespace: string = 'config';

  public getAppConfiguration(): Promise<AppConfigModel> {
    const endpoint = `${window.location.origin}/${this.appConfigNamespace}/${window.location.hostname}.json`;
    return http.get(endpoint).then((response) => {
      return appConfigSerializer.appConfigModelSerializer(response.data);
    });
  }
}

export const appConfigAPI = AppConfigAPI.instance;
