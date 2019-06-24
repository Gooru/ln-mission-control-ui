import { SessionModel } from '@/models/auth/session';

/**
 *
 * This Auth serializer is responsible for converting the Raw format to model.
 *
 */
export class AuthSerializer {
  private static INSTANCE = new AuthSerializer();

  static get instance() {
    return this.INSTANCE;
  }

  public sessionModelSerializer(res: any) {
    const result: SessionModel = {
      access_token: res.access_token,
      access_token_validity: res.access_token_validity,
      cdn_urls: res.cdn_urls,
      provided_at: res.provided_at,
      user_id: res.user_id,
      username: res.username,
      email: res.email,
      first_name: res.first_name,
      last_name: res.last_name,
      user_category: res.user_category,
      thumbnail: res.thumbnail,
    };
    return result;
  }
}

export const authSerializer = AuthSerializer.instance;
