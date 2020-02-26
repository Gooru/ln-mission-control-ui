import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import PortfolioPanel from '../portfolio-panel/portfolio-panel';
import PreferencesPanel from '../preferences-panel/preferences-panel';
import DomainsListPanel from '../domains-list-panel/domains-list-panel';
import CompetenciesListPanel from '../competencies-list-panel/competencies-list-panel';
import MetadataPanel from '../metadata-panel/metadata-panel';
import LearningMap from '@/components/competency/learning-map/learning-map';
import { ClassificationModel } from '@/models/taxonomy/classification';
import { SubjectModel } from '@/models/taxonomy/subject';
import { DomainModel } from '@/models/proficiency/domain';
import { CompetencyModel } from '@/models/proficiency/competency';
import GoogleMaterialIcon from '@/components/icons/google-material-icon/google-material-icon';

@Component({
  name: 'knowledge-panel',
  components: {
    'portfolio-panel': PortfolioPanel,
    'preferences-panel': PreferencesPanel,
    'domains-list-panel': DomainsListPanel,
    'competencies-list-panel': CompetenciesListPanel,
    'metadata-panel': MetadataPanel,
    'learning-map': LearningMap,
    'google-material-icon': GoogleMaterialIcon,
  },
})

export default class KnowledgePanel extends Vue {

  @Prop()
  public classification!: ClassificationModel;

  @Prop()
  private subject!: SubjectModel;

  @Prop()
  private domain!: DomainModel;

  @Prop()
  private competency!: CompetencyModel;

  @Prop()
  private userId!: string;

  @Prop()
  private month!: string;

  @Prop()
  private year!: string;

  @Prop()
  private activeFacets!: SubjectModel[];

  @Prop()
  private statsBucket!: string;

  @Prop()
  private learningMapData!: any;

  @Prop()
  private facetsCompetencyMatrix!: any;

  private isShowDomainList: boolean = true;

  private isShowCompetencyList: boolean = true;

  private isShowPortfolioContainer: boolean = false;

  private isShowPreferencesContainer: boolean = false;

  private isShowLearningMap: boolean = false;

  private isShowMetadata: boolean = false;

  private isShowFacetsProficiency: boolean = true;

  public onSelectDomain(domain: any) {
    this.$emit('onSelectDomain', domain);
  }

  public onSelectCompetency(competency: any) {
    this.$emit('onSelectCompetency', competency);
  }

  private created() {
    this.isShowPortfolioContainer = this.statsBucket === 'competency' || this.statsBucket === 'facets';
  }

  private onSelectPortfolioStat(portfolioStat: any) {
    this.$emit('onSelectPortfolioStat', portfolioStat);
  }
}
