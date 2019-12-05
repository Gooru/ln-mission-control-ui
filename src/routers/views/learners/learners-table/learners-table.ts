import {Component, Vue} from 'vue-property-decorator';
import GoogleMaterialIcon from '@/components/icons/google-material-icon/google-material-icon';
import {learnersProfile} from '@/providers/apis/learners-profile/learners-profile';

@Component({
  name: 'learner',
  components: {
    'material-icon': GoogleMaterialIcon,
  },
})

export default class LearnersTable extends Vue {

  /**
   * @property {Array} learnerDetails used to hold learner details
   */
  public learnerDetails: any = [];

  // --------------------------------------------------------------------
  // Hooks
  public created() {
     learnersProfile.getLearnersProfile().then((learners) => {
       this.learnerDetails = learners;
     });
  }


  // --------------------------------------------------------------------
  // Actions
  /**
   *
   * @param learner
   */
  private onSelectLearner(learner: object) {
    this.$router.push('/learners/proficiency');
  }
}
