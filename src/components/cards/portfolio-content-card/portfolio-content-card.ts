import { Component, Vue, Prop } from 'vue-property-decorator';
import MCIcon from '@/components/icons/mc-icon/mc-icon';
import { PortfolioContent } from '@/models/portfolio/portfolio-content';
import { formatTime as formatTimeInMilliSec } from '@/utils/date';
import { getGradeRange } from '@/utils/utils';
import moment from 'moment';

@Component({
  name: 'portfolio-content-card',

  components: {
    'mc-icon': MCIcon,
  },

  filters: {
    formatDate(date: string, format: string = 'DD MMM YYYY') {
      return date ? moment(date).format(format) : '';
    },
    formatTime(timeInMilliSec: number) {
      return timeInMilliSec ? formatTimeInMilliSec(timeInMilliSec) : '';
    },

  },
})

export default class PortfolioContentCard extends Vue {

  @Prop()
  private content!: PortfolioContent;

  get isCollection() {
    return this.content ? this.content.contentType === 'collection' : false;
  }

  get isAssessment() {
    return this.content ? this.content.contentType === 'assessment' : false;
  }

  get isOfflineActivity() {
    return this.content ? this.content.contentType === 'offline-activity' : false;
  }

  public gradeRange(score: number) {
    return getGradeRange(score);
  }

}
