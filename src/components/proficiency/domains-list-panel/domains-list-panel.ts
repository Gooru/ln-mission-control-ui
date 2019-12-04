import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import DomainInfoPanel from '@/components/proficiency/domain-info-panel/domain-info-panel';
import { CompetencyModel } from '@/models/proficiency/competency';
import { DomainModel } from '@/models/proficiency/domain';
import { SubjectModel } from '@/models/taxonomy/subject';
import { ClassificationModel } from '@/models/taxonomy/classification';
import { competencyAPI } from '@/providers/apis/competency/competency';
import axios from 'axios';

@Component({
  name: 'domains-list-panel',
  components: {
    'domain-info-panel': DomainInfoPanel,
  },
})
export default class DomainsListPanel extends Vue {

  @Prop()
  public subject!: SubjectModel;

  @Prop()
  public classification!: ClassificationModel;

  public subjectCode: string = 'K12.MA';

  public domainMatrix!: any;

  public matrixCoOrdinates!: any;

  @Prop()
  public domainProficiencyData!: DomainModel[];

  public isShowDomainInfo: boolean = false;

  @Prop()
  public activeDomainInfo!: DomainModel;

  public isLoading: boolean = false;

  public created() {
    this.loadProficiencyData();
  }

  public onSelectdomain(domain: DomainModel) {
    const component = this;
    component.activeDomainInfo = domain;
    component.isShowDomainInfo = true;
  }

  public onCloseDomainInfoPanel() {
    this.isShowDomainInfo = false;
  }

  @Watch('subject')
  public onChangeSubject() {
    this.subjectCode = this.subject.code;
    this.loadProficiencyData();
  }

  public loadProficiencyData() {
    const component = this;
    component.isLoading = true;
    const domainMatrixPromise = component.fetchUserDomainCompetencyMatrix();
    const matrixCoOrdinatesPromise = component.fetchMatrixCoOrdinates();
    axios.all([domainMatrixPromise, matrixCoOrdinatesPromise]).then(
      axios.spread((domainMatrix: any, matrixCoOrdinates: any) => {
      component.domainMatrix = domainMatrix;
      component.matrixCoOrdinates = matrixCoOrdinates.domains;
      component.domainProficiencyData = component.parseChartData(matrixCoOrdinates.domains, domainMatrix);
      component.isLoading = false;
    }));
  }

  public parseChartData(domainCoOrdinates: DomainModel[], domainCompetencyMatrix: DomainModel[]) {
    const component = this;
    const chartData: any[] = [];
    domainCoOrdinates.map( (domainCoOrdinate) => {
      const domainMatrixData: DomainModel | any = domainCompetencyMatrix.find(
        (domainMatrix: any) => domainMatrix.domainCode === domainCoOrdinate.domainCode,
      );
      const competencies = domainMatrixData.competencies;
      const domainCode = domainMatrixData.domainCode;
      const domainName = domainCoOrdinate.domainName;
      const domainSeq = domainCoOrdinate.domainSeq;
      const domainChartData: any = {
        domainName,
        domainCode,
        domainSeq,
        competencies: [],
        masteredCompetencies: 0,
        inprogressCompetencies: 0,
        notstartedCompetencies: 0,
      };
      competencies.map( (competency: CompetencyModel) => {
        const competencyData: any = {
          domainName,
          domainCode,
          domainSeq,
          competencyCode: competency.competencyCode,
          competencyName: competency.competencyName,
          competencySeq: competency.competencySeq,
          competencyStudentDesc: competency.competencyStudentDesc,
          competencyStatus: competency.status,
          isMastered: competency.status > 1,
          isInferred: competency.status === 2 || competency.status === 3,
          isSkyLineCompetency: false,
          isGradeBoundary: false,
        };
        domainChartData.competencies.push(competencyData);
        if (competency.status === 0) {
          domainChartData.notstartedCompetencies++;
        } else if (competency.status === 1) {
          domainChartData.inprogressCompetencies++;
        } else {
          domainChartData.masteredCompetencies++;
        }
      });
      const masteredCompetencies = domainChartData.competencies.filter(
        (domainCompetency: any) => domainCompetency.isMastered,
      );
      const skylineCompetencyPos = masteredCompetencies.length === 0 ? 0 : masteredCompetencies.length - 1;
      const skylineCompetency: any = domainChartData.competencies[skylineCompetencyPos];
      skylineCompetency.isSkyLineCompetency = true;
      chartData.push(domainChartData);
    });
    return chartData;
  }

  public fetchUserDomainCompetencyMatrix() {
    const params = {
      user: '5a43c256-6b9f-4543-9fbb-b5e32864d2c6',
      subject: this.subjectCode,
    };
    return competencyAPI.fetchUserDomainCompetencyMatrix(params);
  }

  public fetchMatrixCoOrdinates() {
    const params = {
      subject: this.subjectCode,
    };
    return competencyAPI.getCompetencyMatrixCoordinates(params);
  }

}
