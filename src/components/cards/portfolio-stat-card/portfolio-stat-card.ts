import { Component, Vue, Prop } from 'vue-property-decorator';
import MCIcon from '@/components/icons/mc-icon/mc-icon';
import GoogleMaterialIcon from '@/components/icons/google-material-icon/google-material-icon';

@Component({
  name: 'portfolio-stat-card',
  components: {
    'mc-icon': MCIcon,
    'google-material-icon': GoogleMaterialIcon,
  },
})
export default class PortfolioStatCard extends Vue {

  @Prop()
  public statInfo!: any;

  @Prop()
  public sequence!: number;

  public isShowStatDetails: boolean = false;

  @Prop()
  public statType!: string;

  get totalCount() {
    return this.statInfo.totalCount || 0;
  }

  get title() {
    let title = '';
    const statType = this.statType;
    if (statType === 'subject') {
      title = this.statInfo.domainName;
    } else if (statType === 'domain') {
      title = this.statInfo.competencyCode;
    } else {
      title = this.statInfo.subjectName;
    }
    return title;
  }

  get statDetails() {
    const component = this;
    const statInfo = component.statInfo;
    const statDetails = [
      {
        count: statInfo.collectionCount + statInfo.collectionExternalCount,
        type: 'collection',
      },
      {
        count: statInfo.assessmentCount + statInfo.assessmentExternalCount,
        type: 'assessment',
      },
      {
        count: statInfo.oaCount,
        type: 'offline-activity',
      },
    ];
    return statDetails;
  }

}
