import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import CompetenciesListPanel from '@/components/proficiency/competencies-list-panel/competencies-list-panel';
import MindsetsListPanel from '@/components/proficiency/mindsets-list-panel/mindsets-list-panel';
import PortfolioPanel from '@/components/proficiency/portfolio-panel/portfolio-panel';
import PreferencesPanel from '@/components/proficiency/preferences-panel/preferences-panel';
import GoogleMaterialIcon from '@/components/icons/google-material-icon/google-material-icon';
import { SubjectModel } from '@/models/taxonomy/subject';
import { ClassificationModel } from '@/models/taxonomy/classification';
import { DomainModel } from '@/models/proficiency/domain';
import moment from 'moment';

@Component({
  name: 'domain-info-panel',
  components: {
    'google-material-icon': GoogleMaterialIcon,
    'competencies-list-panel': CompetenciesListPanel,
    'mindsets-list-panel': MindsetsListPanel,
    'portfolio-panel': PortfolioPanel,
    'preferences-panel': PreferencesPanel,
  },
})
export default class DomainInfoPanel extends Vue {

  @Prop()
  public domain!: DomainModel;

  @Prop()
  public subject!: SubjectModel;

  @Prop()
  public classification!: ClassificationModel;

  public activeTab: object = {
    title: 'Competencies',
    component: 'competencies-list-panel',
  };

  public tabItems = [
    {
      title: 'Competencies',
      component: 'competencies-list-panel',
    },
    {
      title: 'Mindsets',
      component: 'mindsets-list-panel',
    },
    {
      title: 'Portfolio',
      component: 'portfolio-panel',
    },
    {
      title: 'Preferences',
      component: 'preferences-panel',
    },
  ];

  @Prop()
  private userId!: string;

  @Prop()
  private month!: string;

  @Prop()
  private year!: string;

  public onSelectCompetency(competency: any) {
    this.$emit('onSelectCompetency', competency);
  }
}
