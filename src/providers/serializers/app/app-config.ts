import { AppConfigModel } from '@/models/app/app-config';


/**
 *
 * This App Config serializer is responsible for converting the Raw format to model.
 *
 */
export class AppConfigSerializer {
  private static INSTANCE = new AppConfigSerializer();

  static get instance() {
    return this.INSTANCE;
  }

  public appConfigModelSerializer(res: any) {
    const result: AppConfigModel = {
      api_endpoint_url: res.api_endpoint_url,
    };
    return result;
  }

  public appPermissionSerializer(res: any, permission: any) {
    const userRole: any = {
      menus: [],
      pages: [],
    };
    if (permission && permission.length && res) {
      permission.map((role: any) => {
        userRole.menus = [...userRole.menus, ...res[role].menus];
        userRole.pages = [...userRole.pages, ...res[role].pages];
      });
    }
    userRole.landingPage = userRole.menus[0];
    return userRole;
  }

  private serializerPermissionComponents(userRole: any, res: any) {
    Object.keys(res).map((pages) => {
      const hasPage: any = userRole[pages] ? userRole[pages] : [];
      userRole[pages] = [...hasPage, ...res[pages]];
    });
    return userRole;
  }


}

export const appConfigSerializer = AppConfigSerializer.instance;
