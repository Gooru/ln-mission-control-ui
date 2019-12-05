import {Component, Vue} from 'vue-property-decorator';
import { sessionService } from '@/providers/services/auth/session';
export class LearnerProfileService extends Vue {
    private static INSTANCE = new LearnerProfileService();
    static get instance() {
        return this.INSTANCE;
    }
    private session: any = sessionService.getSession();

    public serializeLearnersProfile(learnersProfiles: any) {
        const users = learnersProfiles.users ? learnersProfiles.users : [];
        if (users.length) {
            users.map((user: any) => {
                user.thumbnail = this.session.cdn_urls.user_cdn_url + user.thumbnail;
            });
        }
        return users;
    }
}

export const learnerProfileService = LearnerProfileService.instance;
