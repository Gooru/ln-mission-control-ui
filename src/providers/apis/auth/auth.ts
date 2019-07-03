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


  public logInWithCredential(
    usernameOrEmail: string,
    password: string,
  ): Promise<SessionModel> {
    const data = {
      client_id: process.env.VUE_APP_CLIENT_ID,
      client_key: process.env.VUE_APP_CLIENT_KEY,
      grant_type: 'credential',
    };
    const endpoint = `${this.authNamespace}/v2/signin`;
    const token = `${usernameOrEmail}:${password}`;
    const headers = http.getBasicHeaders(token);
    return http.post(endpoint, headers, data).then((response) => {
      return authSerializer.sessionModelSerializer(response.data);
    });
  }

  public signInWithToken(token: string): Promise<SessionModel> {
    const endpoint = `${this.authNamespace}/v2/token`;
    const headers = http.getTokenHeaders(token);
    return http.get(endpoint, headers).then((response) => {
      return authSerializer.sessionModelSerializer(response.data);
    });
  }

  public signOut() {
    const headers = http.getTokenHeaders();
    const endpoint = `${this.authNamespace}/v2/signout`;
    return http.delete(endpoint, headers);
  }
}

export const authAPI = AuthAPI.instance;
