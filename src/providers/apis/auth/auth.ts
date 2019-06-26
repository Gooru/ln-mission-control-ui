import { http } from '@/providers/apis/http';
import { Observable } from 'rxjs/Observable';
import { SessionModel } from '@/models/auth/session';
import { appConfigService } from '@/providers/services/app/app-config';
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

  private adminAuthNamespace: string = 'api/nucleus-admin';

  public impersonate(userId: string): Observable<string> {
    const endpoint = `${this.adminAuthNamespace}/v1/auth/user/impersonate/${userId}`;
    const headers = http.getTokenHeaders();
    return http.post(endpoint, headers).map((ajaxResponse) => {
      const res = ajaxResponse.response;
      return res.access_token;
    });
  }

  public logInWithCredential(
    usernameOrEmail: string,
    password: string,
  ): Observable<SessionModel> {
    const endpoint = `${this.adminAuthNamespace}/v1/authentication`;
    const token = `${usernameOrEmail}:${password}`;
    const headers = http.getBasicHeaders(token);
    const data = {};
    return http.post(endpoint, headers, data).map((ajaxResponse) => {
      const res = ajaxResponse.response;
      return authSerializer.sessionModelSerializer(res);
    });
  }

  public signInWithToken(token: string): Observable<SessionModel> {
    const endpoint = `${this.authNamespace}/v2/token`;
    const headers = http.getTokenHeaders(token);
    return http.get(endpoint, headers).map((ajaxResponse) => {
      const res = ajaxResponse.response;
      return authSerializer.sessionModelSerializer(res);
    });
  }

  public signOut(): Observable<void> {
    const headers = http.getTokenHeaders();
    const endpoint = `${this.authNamespace}/v2/signout`;
    return http.delete(endpoint, headers);
  }
}

export const authAPI = AuthAPI.instance;
