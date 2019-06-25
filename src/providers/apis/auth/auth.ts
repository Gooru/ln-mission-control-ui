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

  public signInAsAnonymous(): Observable<SessionModel> {
    const data = {
      client_id: appConfigService.getClientId(),
      client_key: appConfigService.getClientKey(),
      grant_type: 'anonymous',
    };
    const endpoint = `${this.authNamespace}/v2/signin`;
    return http.post(endpoint, null, data).map((ajaxResponse) => {
      const res = ajaxResponse.response;
      return authSerializer.sessionModelSerializer(res);
    });
  }

  public signInWithCredential(
    usernameOrEmail: string,
    password: string,
  ): Observable<SessionModel> {
    const data = {
      client_id: appConfigService.getClientId(),
      client_key: appConfigService.getClientKey(),
      grant_type: 'credential',
    };
    const endpoint = `${this.authNamespace}/v2/signin`;
    const token = `${usernameOrEmail}:${password}`;
    const headers = http.getBasicHeaders(token);
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
