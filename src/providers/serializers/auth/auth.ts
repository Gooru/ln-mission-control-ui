import { SessionModel } from '@/models/auth/session';
import { SessionRGOModel } from '@/models/auth/session-rgo';
import { DEFAULT_IMAGES_PATH } from '@/utils/constants';

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
      permissions: res.permissions,
      email: res.email,
      isSuperAdmin: res.permissions ? res.permissions.indexOf('GROUP_SUPER_ADMIN') !== -1 : false,
      first_name: res.first_name,
      last_name: res.last_name,
      user_category: res.user_category,
      thumbnail: res.thumbnail,
      tenant: res.tenant,
      thumbnail_url: this.getThumbnailUrl(res),
      user_display_name: this.getUserDisplayName(res),
    };
    return result;
  }

  public sessionModelRGOSerializer(res: any) {
    const result: SessionRGOModel = {
      authenticated: {
        authenticator: 'authenticator:auth-api-3',
        accessToken: res.access_token,
        user: {
          username: res.username,
          id: res.user_id,
          avatarUrl: this.getThumbnailUrl(res),
        },
        cdnUrls: {
          user: res.cdn_urls.user_cdn_url,
          content: res.cdn_urls.content_cdn_url,
        },
        isAuthenticated: true,
      },
    };
    return result;
  }

  private getThumbnailUrl(res: any) {
    let thumbnailUrl: string = '';
    if (res.thumbnail) {
      thumbnailUrl = (res.cdn_urls.user_cdn_url + res.thumbnail);
    } else {
      thumbnailUrl = DEFAULT_IMAGES_PATH.profile;
    }
    return thumbnailUrl;
  }

  private getUserDisplayName(res: any) {
    let userDisplayName: string = '';
    if (res.first_name) {
      userDisplayName = res.first_name;
      if (res.last_name) {
        userDisplayName += ` ${res.last_name}`;
      }
    } else if (res.username) {
      userDisplayName = res.username;
    } else if (res.email) {
      userDisplayName = res.email.split('@')[0];
    }
    return userDisplayName;
  }

}

export const authSerializer = AuthSerializer.instance;
