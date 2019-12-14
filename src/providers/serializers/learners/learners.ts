import {Component, Vue} from 'vue-property-decorator';
import { sessionService } from '@/providers/services/auth/session';
import LearnerModel from '@/models/learners/learner';
import { DEFAULT_IMAGES_PATH } from '@/utils/constants';

export class LearnerSerializer extends Vue {
    private static INSTANCE = new LearnerSerializer();
    static get instance() {
        return this.INSTANCE;
    }
    private session: any = sessionService.getSession();

    public serializeLearners(res: any): LearnerModel[] {
        const learners = res.learners ? res.learners : [];
        const resultSet: LearnerModel[] = new Array();
        if (learners.length) {
            learners.map((learner: any) => {
                resultSet.push(this.learnerModelSerializer(learner));
            });
        }
        return resultSet;
    }

    private learnerModelSerializer(res: any): LearnerModel {
      const result: LearnerModel = {
        userId: res.userId,
        username: res.username,
        about: res.about,
        country: res.country,
        displayname: res.displayname,
        email: res.email,
        userCategory: res.userCategory,
        firstname: res.firstname,
        lastname: res.lastname,
        gender: res.gender,
        referenceId: res.referenceId,
        rosterGlobalUserId: res.rosterGlobalUserId,
        schoolDistrict: res.schoolDistrict,
        thumbnail: res.thumbnail ? this.session.cdn_urls.user_cdn_url + res.thumbnail : DEFAULT_IMAGES_PATH.profile,
      };
      return result;
    }
}

export const learnerSerializer = LearnerSerializer.instance;
