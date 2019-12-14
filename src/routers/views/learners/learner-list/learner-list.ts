import {Component, Vue} from 'vue-property-decorator';
import GoogleMaterialIcon from '@/components/icons/google-material-icon/google-material-icon';
import {learnerAPI} from '@/providers/apis/learners/learners';

@Component({
  name: 'learner-list',
  components: {
    'material-icon': GoogleMaterialIcon,
  },
})

export default class LearnerList extends Vue {

  /**
   * @property {Array} learnerDetails used to hold learner details
   */
  public learnerDetails: any = [];

  // --------------------------------------------------------------------
  // Hooks
  public created() {
     learnerAPI.fetchLearners().then((learners) => {
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
