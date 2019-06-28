import { http } from '@/providers/apis/http';
import { userSerializer } from '@/providers/serializers/user/user';
import { UserDistributionByGeoLocationModel } from '@/models/user/user-distribution-by-geolocation';

/**
 *
 * This Users API Provider is responsible for all users related API's.
 *
 */
export class UserAPI {

  private static INSTANCE = new UserAPI();

  static get instance() {
    return this.INSTANCE;
  }

  private stubsNamespace: string = 'stubs';

  public getUserDistributionByGeoLocation(): Promise<UserDistributionByGeoLocationModel[]> {
    const endpoint = `${window.location.origin}/${this.stubsNamespace}/user-count-geolocation.json`;

    return new Promise((resolve, reject) => {
      return http.get(endpoint).then((response) => {
        resolve(userSerializer.usersDistributionByGeoLocationModelSerializer(response.data));
      });
    });
  }
}

export const userAPI = UserAPI.instance;
