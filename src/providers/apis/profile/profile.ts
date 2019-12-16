import { http } from '@/providers/apis/http';
import { profileSerializer } from '@/providers/serializers/profile/profile';
import { User } from '@/models/profile/user';
export class ProfileAPI {

  private static INSTANCE = new ProfileAPI();

  static get instance() {
    return this.INSTANCE;
  }

  private namespace: string = 'api/nucleus/v2';

  public fetchUserProfiles<T>(userIds: any): Promise<User[]> {
    const endpoint = `${this.namespace}/profiles/search`;
    const headers = http.getTokenHeaders();
    const params = {
      userids: userIds,
    };
    return http.get(endpoint, headers, params).then((response) => {
      return profileSerializer.serializeUserProfiles(response.data);
    });
  }

}

export const profileAPI = ProfileAPI.instance;
