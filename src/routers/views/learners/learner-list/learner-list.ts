import {Component, Vue, Watch} from 'vue-property-decorator';
import GoogleMaterialIcon from '@/components/icons/google-material-icon/google-material-icon';
import LearnerFilter from '@/components/selector/learner-filter/learner-filter';
import {learnerAPI} from '@/providers/apis/learners/learners';
import LearnerModel from '@/models/learners/learner';
import { sortByProperty as sortBy } from '@/utils/utils';

@Component({
  name: 'learner-list',
  components: {
    'material-icon': GoogleMaterialIcon,
    'learner-filter': LearnerFilter,
  },
})

export default class LearnerList extends Vue {

  /**
   * @property {Array} learnerDetails used to hold learner details
   */
  public learnerDetails: LearnerModel[] | any = new Array();

  private limit: number = 20;

  private offset: number = 0;

  private isLoading: boolean = false;

  private searchLearnerText: string = '';

  private isFetchedAllLearners: boolean = false;

  // --------------------------------------------------------------------
  // Hooks
  public created() {
    const component = this;
    component.loadLearners();
  }

  private mounted() {
    this.scrollHandler();
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

  private onSearchLearners() {
    this.offset = 0;
    this.learnerDetails = [];
    this.loadLearners();
  }

  private onClearSearch() {
    this.searchLearnerText = '';
    this.onSearchLearners();
  }

  private loadLearners() {
    const component = this;
    component.isLoading = true;
    const learnerDetails = component.learnerDetails;
    const params = {
      offset: component.offset,
      limit: component.limit,
      query: component.searchLearnerText.length ? component.searchLearnerText.toLowerCase() : undefined,
    };
    learnerAPI.fetchLearners(params).then((learners: LearnerModel[]) => {
       component.learnerDetails = learnerDetails.concat(learners);
       component.isFetchedAllLearners = learners.length < component.limit;
       component.isLoading = false;
     });
  }

  private scrollHandler() {
    const component = this;
    const bodyContainer: null | any = this.$el.querySelector('.learner-table-section-body');
    bodyContainer.onscroll = () => {
      const innerHeight = bodyContainer.clientHeight;
      const scrollTop = bodyContainer.scrollTop;
      const scrollHeight = bodyContainer.scrollHeight;
      if ((scrollTop + innerHeight >= scrollHeight - 100) && !component.isLoading && !component.isFetchedAllLearners) {
        component.offset = component.learnerDetails.length;
        component.loadLearners();
      }
    };
  }
}
