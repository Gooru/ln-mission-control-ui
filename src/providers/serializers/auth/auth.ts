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
    };
    return result;
  }
}

export  const authSerializer = AuthSerializer.instance;
