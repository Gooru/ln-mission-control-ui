import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { portfolioAPI } from '@/providers/apis/portfolio/portfolio';
import { SubjectModel } from '@/models/taxonomy/subject';
import { DomainModel } from '@/models/proficiency/domain';
import { CompetencyModel } from '@/models/proficiency/competency';
import { PortfolioContent } from '@/models/portfolio/portfolio-content';
import { PortfolioSubjectStat } from '@/models/stats/portfolio-subject';
import { PortfolioDomainStat } from '@/models/stats/portfolio-domain';
import { PortfolioCompetencyStat } from '@/models/stats/portfolio-competency';
import PortfolioContentCard from '@/components/cards/portfolio-content-card/portfolio-content-card';
import PortfolioStatCard from '@/components/cards/portfolio-stat-card/portfolio-stat-card';
import moment from 'moment';
import Axios from 'axios';
import { competencyAPI } from '@/providers/apis/competency/competency';

@Component({
  name: 'portfolio-panel',
  components: {
    'portfolio-content-card': PortfolioContentCard,
    'portfolio-stat-card': PortfolioStatCard,
  },
})

export default class PortfolioPanel extends Vue {

  get portfolioStats() {
    let portfolioStats: PortfolioDomainStat[] | PortfolioCompetencyStat[] | PortfolioSubjectStat[] = [];
    const statsBucket = this.statsBucket;
    if (statsBucket === 'subject') {
      portfolioStats = this.portfolioSubjectStats;
    } else if (statsBucket === 'domain') {
      portfolioStats = this.portfolioDomainStats;
    } else {
      portfolioStats = this.portfolioFacetsStats.filter(
        (portfolioFacetStat) => this.activeFacets.find(
          (activeFacet) => portfolioFacetStat.subjectCode === activeFacet.id));
    }
    return portfolioStats;
  }

  get isNoPortfolioItems() {
    return !(this.portfolioContents.length || this.portfolioStats.length);
  }

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

  private activityType = 'assessment';

  private portfolioContents: PortfolioContent[] = [];

  private portfolioFacetsStats: PortfolioSubjectStat[] = [];

  private portfolioSubjectStats: PortfolioDomainStat[] = [];

  private portfolioDomainStats: PortfolioCompetencyStat[] = [];

  private protfolioStats: PortfolioDomainStat[] | PortfolioCompetencyStat[] | PortfolioSubjectStat[] = [];

  private isLoadContents: boolean = false;

  private isLoading: boolean = false;

  @Prop()
  private statsBucket!: string;

  @Watch('subject')
  public onChangeSubject() {
    this.loadData();
  }

  public created() {
    this.loadData();
  }

  public loadData() {
    const component = this;
    if (component.isLoadContents || component.statsBucket === 'competency') {
      component.loadPortfolioContents();
    } else {
      component.loadPortfolioStats();
    }
  }

  public loadPortfolioStats() {
    const component = this;
    if (component.statsBucket === 'subject') {
      component.getPortfolioStatsBySubject();
    } else if (component.statsBucket === 'domain') {
      component.getPortfolioStatsByDomain();
    } else {
      component.getAllFacetsPortfolioStats();
    }
  }

  public getPortfolioStatsBySubject() {
    const component = this;
    this.isLoading = true;
    const requestParams = component.getStatsParams();
    const domainParams = component.getStatsParams(true);
    const domainPromise: Promise<any> = competencyAPI.fetchUserDomainCompetencyMatrix(domainParams);
    Axios.all([
      domainPromise,
      portfolioAPI.fetchPortfolioStatsBySubject(requestParams),
    ]).then(Axios.spread((domainMatrix, portfolioSubjectStats: PortfolioDomainStat[]) => {
      const MaterixStats: PortfolioDomainStat[] | any = portfolioSubjectStats.map((stat) => {
        const domainCompetency: any =  domainMatrix.find((materix) => materix.domainCode === stat.domainCode);
        if (domainCompetency) {
          domainCompetency.competencies = domainCompetency.competencies.map((competency: any) => {
           return {
            competencyCode: competency.competencyCode,
            competencyName: competency.competencyName,
            competencySeq: competency.competencySeq,
            competencyStatus: competency.status,
            competencyStudentDesc: competency.competencyStudentDesc,
            domainCode: stat.domainCode,
            domainName: stat.domainName,
            domainSeq: stat.domainSeq,
            isMastered: competency.status > 1,
            isInferred: competency.status === 2 || competency.status === 3,
            isSkyLineCompetency: false,
            isGradeBoundary: false,
           };
          });
          return {
            ...stat,
            ...domainCompetency,
          };
        }
      });
      this.isLoading = false;
      component.portfolioSubjectStats = MaterixStats;
    }));
  }

  public getPortfolioStatsByDomain() {
    const component = this;
    const requestParams = component.getStatsParams();
    portfolioAPI.fetchPortfolioStatsByDomain(requestParams).then((portfolioDomainStats: PortfolioCompetencyStat[]) => {
      component.portfolioDomainStats = portfolioDomainStats;
    });
  }

  public loadPortfolioContents() {
    const component = this;
    const requestParams = {
      gutCode: component.competency.competencyCode,
      activityType: component.activityType,
      userId: component.userId,
      offset: 0,
      limit: 10,
    };
    portfolioAPI.fetchPortfolioContents(requestParams, 'competency').then((portfolioContents: PortfolioContent[]) => {
      component.portfolioContents = portfolioContents;
    });
  }

  public getStatsParams(isDomain = false) {
    const component = this;
    const requestParams: any = {
      user: component.userId,
      month: Number(component.month),
      year: Number(component.year),
    };
    if (isDomain) {
      requestParams.subject = component.subject.code;
    } else {
      if (component.statsBucket === 'subject') {
        requestParams.tx_subject_code = component.subject.code;
      } else if (component.statsBucket === 'domain') {
        requestParams.tx_subject_code = component.subject.code;
        requestParams.tx_domain_code = component.domain.domainCode;
      }
    }
    return requestParams;
  }

  @Watch('competency')
  private onChangeCompetency() {
    this.loadData();
  }

  private onSelectPortfolioStat(portfolioStat: PortfolioDomainStat | PortfolioCompetencyStat | PortfolioSubjectStat) {
    this.$emit('onSelectPortfolioStat', portfolioStat);
  }

  @Watch('month')
  private onChageTimeline() {
    this.loadData();
  }

  private getAllFacetsPortfolioStats() {
    const component = this;
    const requestParams = component.getStatsParams();
    portfolioAPI.fetchPortfolioStatsAllFacets(requestParams).then((portfolioFacetsStats: PortfolioSubjectStat[]) => {
      component.portfolioFacetsStats = portfolioFacetsStats;
    });
  }
}
