import { sessionService } from '@/providers/services/auth/session';
import { User } from '@/models/profile/user';
import { DEFAULT_IMAGES_PATH } from '@/utils/constants';

export class ProfileSerializer {
  static get instance() {
    return this.INSTANCE;
  }
  private static INSTANCE = new ProfileSerializer();

  public serializeUserProfiles(userProfiles: any): User[] {
    const serializer = this;
    const usersList = userProfiles.users || [];
    const serializedUserProfiles: User[] = usersList.map( (userProfile: any) => {
      return serializer.normalizeUserProfile(userProfile);
    });
    return serializedUserProfiles;
  }

  private normalizeUserProfile(userProfile: any): User {
    const cdnUrls = sessionService.getCdnUrl();
    const userCdnUrl = cdnUrls.user_cdn_url;
    const thumbnailUrl = userProfile.thumbnail ?
      userCdnUrl + userProfile.thumbnail :
        window.location.origin + DEFAULT_IMAGES_PATH.profile;
    const serializedUserProfile: User = {
      userId: userProfile.id,
      firstName: userProfile.first_name,
      lastName: userProfile.last_name,
      username: userProfile.username,
      email: userProfile.email,
      fullName: userProfile.last_name + ' ' + userProfile.first_name,
      thumbnailUrl,
      createdAt: userProfile.created_at,
      country: userProfile.country,
      state: userProfile.state,
      district: userProfile.district || userProfile.school_district,
      about: userProfile.about,
      updateAt: userProfile.updated_at,
      role: userProfile.user_category,
    };
    return serializedUserProfile;
  }
}

export const profileSerializer = ProfileSerializer.instance;
