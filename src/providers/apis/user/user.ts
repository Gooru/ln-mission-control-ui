import { http } from '@/providers/apis/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { userSerializer } from '@/providers/serializers/user/user';

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

  public getUserDistributionByGeoLocation(): Observable<object> {
    const endpoint = `${window.location.origin}/${this.stubsNamespace}/user-count-geolocation.json`;
    return http.get(endpoint).map((ajaxResponse) => {
      const res = ajaxResponse.response;
      return userSerializer.usersDistributionByGeoLocationModelSerializer(res);
    });
  }
}

export const userAPI = UserAPI.instance;
