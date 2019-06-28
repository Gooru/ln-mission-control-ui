import { http } from '@/providers/apis/http';
import { SessionModel } from '@/models/auth/session';
import { appConfigService } from '@/providers/services/app/app-config';
import { authSerializer } from '@/providers/serializers/auth/auth';


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

  public impersonate(userId: string): Promise<string> {
    const endpoint = `${this.adminAuthNamespace}/v1/auth/user/impersonate/${userId}`;
    const headers = http.getTokenHeaders();
    return new Promise((resolve, reject) => {
      return http.post(endpoint, headers).then((response) => {
        resolve(response.data.access_token);
      });
    });
  }

  public logInWithCredential(
    usernameOrEmail: string,
    password: string,
  ): Promise<SessionModel> {
    const endpoint = `${this.adminAuthNamespace}/v1/authentication`;
    const token = `${usernameOrEmail}:${password}`;
    const headers = http.getBasicHeaders(token);
    return new Promise((resolve, reject) => {
      return http.post(endpoint, headers).then((response) => {
        resolve(authSerializer.sessionModelSerializer(response.data));
      });
    });
  }

  public signInWithToken(token: string): Promise<SessionModel> {
    const endpoint = `${this.authNamespace}/v2/token`;
    const headers = http.getTokenHeaders(token);
    return new Promise((resolve) => {
      return http.get(endpoint, headers).then((response) => {
        resolve(authSerializer.sessionModelSerializer(response.data));
      });
    });
  }

  public signOut() {
    const headers = http.getTokenHeaders();
    const endpoint = `${this.authNamespace}/v2/signout`;
    return http.delete(endpoint, headers);
  }
}

export const authAPI = AuthAPI.instance;
