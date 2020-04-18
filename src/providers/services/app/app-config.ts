import { AppConfigModel } from '@/models/app/app-config';
import { appConfigSerializer } from '@/providers/serializers/app/app-config';

export class AppConfigService {

  private static INSTANCE = new AppConfigService();

  static get instance() {
    return this.INSTANCE;
  }

  private APP_CONFIG: string = 'MC_APP_CONFIG';

  private APP_USER_ROLE: string = 'MC_APP_USER_ROLE';


  public setAppConfig(appConfigModel: AppConfigModel) {
    localStorage.setItem(this.APP_CONFIG, JSON.stringify(appConfigModel));
  }

  public setAppUserRole(userRole: any) {
    localStorage.setItem(this.APP_USER_ROLE, JSON.stringify(userRole));
  }

  public getAppUserRole() {
    let role = null;
    const userRole = localStorage.getItem(this.APP_USER_ROLE);
    if ( userRole ) {
      role = JSON.parse(userRole);
    }
    return role;
  }


  public getApiUrl() {
    const appConfig = this.getAppConfig();
    return appConfig ? appConfig.api_endpoint_url : process.env.VUE_APP_API_URL;
  }

  public getClientId() {
    return process.env.VUE_APP_CLIENT_ID;
  }

  public getClientKey() {
    return process.env.VUE_APP_CLIENT_KEY;
  }

  private getAppConfig() {
    let appConfig = null;
    const appConfigAsString: string | null = localStorage.getItem(this.APP_CONFIG);
    if (appConfigAsString) {
      const appConfigAsJson = JSON.parse(appConfigAsString);
      appConfig = appConfigSerializer.appConfigModelSerializer(appConfigAsJson);
    }
    return appConfig;
  }

}

export const appConfigService = AppConfigService.instance;
