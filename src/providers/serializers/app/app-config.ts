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


}

export const appConfigSerializer = AppConfigSerializer.instance;
