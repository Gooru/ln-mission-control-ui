import {Component, Vue} from 'vue-property-decorator';
import GoogleMaterialIcon from '@/components/icons/google-material-icon/google-material-icon';
import {learnerAPI} from '@/providers/apis/learners/learners';
import LearnerModel from '@/models/learners/learner';
import { sortByProperty as sortBy } from '@/utils/utils';

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
  public learnerDetails: LearnerModel[] | any = new Array();

  // --------------------------------------------------------------------
  // Hooks
  public created() {
    const component = this;
    learnerAPI.fetchLearners().then((learners) => {
       component.learnerDetails = learners;
     });
  }


  // --------------------------------------------------------------------
  // Actions
  /**
   *
   * @param learner
   */
  private onSelectLearner(learner: LearnerModel) {
    this.$router.push(`/learners/${learner.userId}`);
  }
}
