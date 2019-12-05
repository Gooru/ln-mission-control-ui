import { http } from '@/providers/apis/http';
import {learnerProfileService} from '@/providers/serializers/learners-profile/learners-profile';
export class LearnersProfile {

    private static INSTANCE = new LearnersProfile();

    static get instance() {
        return this.INSTANCE;
    }

    private namespace = 'stubs';

    public getLearnersProfile(): Promise<any> {
        const endpoint = `${window.location.origin}/${this.namespace}/learners/user-profiles.json`;
        return http.get(endpoint).then((respone) => {
            return learnerProfileService.serializeLearnersProfile(respone.data);
        });
    }

}

export const learnersProfile = LearnersProfile.instance;
