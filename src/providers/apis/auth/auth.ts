import { http } from '@/providers/apis/http';
import { Observable } from 'rxjs/Observable';
import { SessionModel } from '@/models/auth/session';
import { authSerializer } from '@/providers/serializers/auth/auth';
import 'rxjs/Rx';

/**
 *
 * This Auth API Provider is responsible for all authentication related API's.
 *
 */
export class AuthAPI {

  private static INSTANCE = new AuthAPI();

  static get instance() {
    return this.INSTANCE;
  }

  private authNamespace: string = 'api/nucleus-auth';

  public signInAsAnonymous(): Observable<SessionModel> {
    const data = {
      client_id: process.env.VUE_APP_CLIENT_ID,
      client_key: process.env.VUE_APP_CLIENT_KEY,
      grant_type: 'anonymous',
    };
    const endpoint = `${this.authNamespace}/v2/signin`;
    return http.post(endpoint, data).map((ajaxResponse) => {
      const res = ajaxResponse.response;
      return authSerializer.sessionModelSerializer(res);
    });
  }

  public signOut(): Observable<void> {
    const reqOpts = { headers: http.getTokenHeaders() };
    const endpoint = `${this.authNamespace}/v2/signout`;
    return http.delete(endpoint, reqOpts);
  }

}

export const authAPI = AuthAPI.instance;
