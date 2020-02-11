import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import GoogleMaterialIcon from '@/components/icons/google-material-icon/google-material-icon';
import { DomainModel } from '@/models/proficiency/domain';
import { CompetencyModel } from '@/models/proficiency/competency';
import { GradeBoundaryModel } from '@/models/taxonomy/grade-boundary';
import { GradeModel } from '@/models/taxonomy/grade';
import { SubjectModel } from '@/models/taxonomy/subject';
import { competencyAPI } from '@/providers/apis/competency/competency';
import { taxonomyAPI } from '@/providers/apis/taxonomy/taxonomy';
import axios from 'axios';
import * as d3 from 'd3';
import moment from 'moment';

@Component({
  name: 'learner-proficiency-chart',
  components: {
    'google-material-icon': GoogleMaterialIcon,
  },
})

export default class LearnerProficiencyChart extends Vue {

  get chartHeight() {
    const component = this;
    const proficiencyChartData = component.chartData;
    const chartContainer = component.$el.querySelector('#chart-area') as HTMLElement;
    const chartContainerHeight = chartContainer.offsetHeight;
    const chartHeight = component.isShowExpandedGraph ?
      component.maxDomainSize * component.expandedGraphCellHeight + 5 :
      chartContainerHeight;
    return chartHeight - 15;
  }

  get chartWidth() {
    const component = this;
    const proficiencyChartData = component.chartData;
    const chartContainer = component.$el.querySelector('#chart-area') as HTMLElement;
    return chartContainer.offsetWidth - 30;
  }

  get subjectCode() {
    return this.subject.code;
  }

  @Prop()
  private userId!: string;

  @Prop()
  private subject!: SubjectModel;

  private proficiencyChartContainer!: any;

  private domainCompetencyMatrix!: DomainModel[];

  private domainCoOrdinates: DomainModel[] = [];

  private chartData?: any = [];

  private skylineContainer!: any;

  private gradelineContainer!: any;

  private proficiencyChartWidth: number = 400;

  private proficiencyChartHeight: number = 600;

  private expandedGraphCellWidth: number = 40;

  private expandedGraphCellHeight: number = 40;

  private compressedGraphCellWidth: number = 40;

  private compressedGraphCellHeight: number = 10;

  private prerequisiteContainer?: any;

  private cellWidth: number = 40;

  private cellHeight: number = 10;

  @Prop()
  private activeCompetency?: any;

  private maxDomainSize: number = 0;

  private isShowExpandedGraph: boolean = false;

  private taxonomyGrades: GradeModel[] = [];

  private gradeBoundaries!: GradeBoundaryModel[];

  private activeGrade: any = {};

  private isLoading: boolean = false;

  @Prop()
  private isDomainActive?: boolean = false;

  @Prop()
  private isShowMultigrade?: boolean;

  @Prop()
  private isCompetencyActive?: boolean = false;

  @Prop()
  private month?: string;

  @Prop()
  private year?: string;

  private totalCompetencies: number = 0;

  @Prop()
  private activeDomainSeq?: any = 0;

  @Prop()
  private isCompetencyLoading: boolean = false;

  private activeCompetencyStyle: any = null;

  @Prop()
  private isCompetencyMap?: boolean;

  @Prop()
  private isDomainView?: boolean;

  private multiGradeActiveList: any = [];

  private activeGradeList: any = [];

  @Prop()
  private prerequisites: any;

  @Prop()
  private isCompetencyView: boolean = false;

  private isSelectedCompetency: boolean = false;

  @Watch('prerequisites')
  public onChangePrerequisite(value: any) {
    this.drawProficiencyChart();
    this.drawPrerequisitesLine();
  }

  @Watch('isCompetencyView')
  public onChangeCompetencyView(value: boolean) {
    if (!value) {
      this.isSelectedCompetency = false;
      this.drawProficiencyChart();
      this.multiGradeActiveList.map((grade: any, index: any) => {
        this.drawGradeBoundaryLine(index);
      });
    }
  }

  public created() {
    this.loadTaxonomyGrades();
  }

  @Watch('isDomainView')
  public watchCompetencyDomain(value: any) {
    if (value) {
      this.loadTaxonomyGrades();
      this.loadChartData();
      this.activeGrade = {};
      this.activeGradeList = [];
    }
  }

  @Watch('subjectCode')
  public onChangeSubject() {
    const component = this;
    component.loadChartData();
    component.loadTaxonomyGrades();
    component.activeGrade = {};
  }


  // -------------------------------------------------------------------------
  // Actions

  public onToggleGraphView() {
    const component = this;
    component.isShowExpandedGraph = !component.isShowExpandedGraph;
    component.isSelectedCompetency = false;
    component.drawProficiencyChart();
    if (component.isCompetencyMap) {
      component.$emit('onChangeGraphView', component.isShowExpandedGraph);
    }
    this.multiGradeActiveList.map((grade: any, index: any) => {
      component.drawGradeBoundaryLine(index);
    });
    if (component.activeDomainSeq) {
      component.toggleActiveDomainBar(component.activeDomainSeq);
    }
  }

  public onSelectGrade(grade: GradeModel | any) {
    const component = this;
    component.multiGradeActiveList = [];
    component.activeGrade = grade;
    const proficiencyChartData = component.chartData;
    proficiencyChartData.map((domainData: any) => {
      const competencies = domainData.competencies;
      const filteredDomain = competencies.filter(
        (competency: any) => competency.className && competency.className !== '');
      filteredDomain.map((filteredCompetency: any) => {
        filteredCompetency.className = '';
      });
    });

    if ((!component.activeGradeList.length) || (component.activeGradeList.length > 1)) {
      component.activeGradeList = [];
      component.activeGradeList.push(grade);
    } else {
      const maxValue = component.taxonomyGrades.findIndex(
        (gradeItem) => gradeItem.id === component.activeGradeList[0].id);
      const minValue = component.taxonomyGrades.findIndex(
        (gradeItem) => gradeItem.id === grade.id);
      const minIndex = minValue < maxValue ? minValue : maxValue;
      const maxIndex = minValue < maxValue ? maxValue : minValue;
      component.activeGradeList = component.taxonomyGrades.slice(minIndex, maxIndex + 1);
    }

    if (component.activeGradeList.length) {
      const boundaryPromise = component.activeGradeList.map((gradeItem: any) => {
        return new Promise((resovle) => {
          component.loadTaxonomyGradeBoundaries(gradeItem.id).then((boundary) => {
            component.multiGradeActiveList[gradeItem.id] = boundary;
            component.gradeBoundaries = boundary;
            return resovle(boundary);
          });
        });
      });
      Promise.all(boundaryPromise).then(() => {
        component.parseGradeBoundaryChartData();
        if (this.isCompetencyMap) {
          this.$emit('onSelectGrade',
            this.chartData, component.activeGradeList,
            component.multiGradeActiveList.flat(1));
        }
      });
    } else {
      d3.selectAll('#gradeline-group line').remove();
      d3.selectAll('#cells-group rect').classed('non-competency', false);
    }
  }

  public onSelectDomain(domain: DomainModel) {
    const component = this;
    if (!domain.competencies) {
      domain = this.chartData.find((domainChart: DomainModel) => {
        return domainChart.domainCode === domain.domainCode;
      });
    }
    this.$emit('onSelectDomain', domain);
    component.toggleActiveDomainBar(domain.domainSeq);
  }

  public backAction() {
    this.$emit('backAction');
  }

  public loadChartData() {
    const component = this;
    component.isLoading = true;
    axios.all([component.fetchUserDomainCompetencyMatrix(), component.fetchMatrixCoOrdinates()]).then(axios.spread(
      (domainCompetencyMatrix: any, matrixCoOrdinates: any) => {
        const domainCoOrdinates = matrixCoOrdinates.domains;
        component.domainCoOrdinates = domainCoOrdinates;
        component.domainCompetencyMatrix = domainCompetencyMatrix;
        component.chartData = component.parseChartData(domainCoOrdinates, domainCompetencyMatrix);
        component.drawProficiencyChart();
        component.isLoading = false;
        if (this.isCompetencyMap) {
          this.$emit('loadingDomain', domainCoOrdinates);
        }
      }));
  }

  public loadTaxonomyGrades() {
    const component = this;
    return taxonomyAPI.fetchTaxonomyGrades(this.subjectCode).then((taxonomyGrades: GradeModel[]) => {
      component.taxonomyGrades = taxonomyGrades;
      component.loadChartData();
    });
  }

  public loadTaxonomyGradeBoundaries(gradeId: number) {
    const component = this;
    return taxonomyAPI.fetchTaxonomyGradeBoundaries(gradeId);
  }

  public parseChartData(domainCoOrdinates: any, domainCompetencyMatrix: any) {
    const component = this;
    const chartData: any = [];
    let maxDomainSize = 0;
    let totalCompetencies = 0;
    domainCoOrdinates.map((domainCoOrdinate: any) => {
      const domainMatrixData = domainCompetencyMatrix.find(
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
      };
      maxDomainSize = competencies.length > maxDomainSize ? competencies.length : maxDomainSize;
      totalCompetencies += competencies.length;
      competencies.map((competency: CompetencyModel) => {
        const competencyData = {
          domainName,
          domainCode,
          domainSeq,
          competencyCode: competency.competencyCode,
          competencyName: competency.competencyName,
          competencySeq: competency.competencySeq,
          competencyStudentDesc: competency.competencyStudentDesc,
          competencyStatus: component.isCompetencyMap ? 2 : competency.status,
          isMastered: competency.status > 1,
          isInferred: competency.status === 2 || competency.status === 3,
          isSkyLineCompetency: false,
          isGradeBoundary: false,
        };
        domainChartData.competencies.push(competencyData);
      });
      const masteredCompetencies = domainChartData.competencies.filter(
        (domainCompetency: any) => domainCompetency.isMastered,
      );
      const skylineCompetencyPos = masteredCompetencies.length === 0 ? 0 : masteredCompetencies.length - 1;
      const skylineCompetency = domainChartData.competencies[skylineCompetencyPos];
      skylineCompetency.isSkyLineCompetency = true;
      chartData.push(domainChartData);
    });
    component.maxDomainSize = maxDomainSize;
    component.totalCompetencies = totalCompetencies;
    return chartData;
  }

  public parseGradeBoundaryChartData() {
    const component = this;
    const proficiencyChartData = component.chartData;
    if (this.multiGradeActiveList.length) {
      const boundaryList = component.multiGradeActiveList;
      const multiGradePromise = boundaryList.map((gradeBoundaries: any, gradeIndex: any) => {
        return new Promise((resolve) => {
          return resolve(this.boundaryMapForMultiGrade(proficiencyChartData, gradeBoundaries, gradeIndex));
        });
      });
      Promise.all(multiGradePromise).then(() => {
        component.chartData = proficiencyChartData;
        component.drawProficiencyChart();
        boundaryList.map((grade: any, index: any) => {
          component.drawGradeBoundaryLine(index);
        });
      });
    }
  }

  public boundaryMapForMultiGrade(proficiencyChartData: any, gradeBoundaries: any, gradeIndex = null) {
    if (gradeBoundaries && gradeBoundaries.length) {
      return proficiencyChartData.map((domainChartData: DomainModel) => {
        const competencies = domainChartData.competencies;
        const domainGradeBoundary: GradeBoundaryModel | any = gradeBoundaries.find(
          (gradeBoundary: GradeBoundaryModel) => gradeBoundary.domainCode === domainChartData.domainCode,
        );
        let gradeBoundaryCompetency: any = competencies[0];
        if (domainGradeBoundary) {
          gradeBoundaryCompetency = competencies.find(
            (competency: any) => competency.competencyCode === domainGradeBoundary.highline,
          );
        }
        gradeBoundaryCompetency.isGradeBoundary = true;
        if (!gradeBoundaryCompetency.className ||
          (gradeBoundaryCompetency.className &&
            gradeBoundaryCompetency.className
              .indexOf(`grade-boundary-competency-${gradeIndex}`) === -1)) {
          gradeBoundaryCompetency.className += ` grade-boundary-competency-${gradeIndex}`;
        }
      });
    }
  }

  public drawProficiencyChart() {
    const component = this;
    const proficiencyChartData = component.chartData;
    const chartHeight = component.chartHeight;
    const chartWidth = component.chartWidth;
    component.cellHeight = this.isShowExpandedGraph ? 40 : chartHeight / component.maxDomainSize;
    component.cellWidth = chartWidth / proficiencyChartData.length;
    d3.select('svg#chart-graph').remove();
    const svg = d3.select('#chart-area')
      .append('svg')
      .attr('id', 'chart-graph')
      .attr('width', chartWidth)
      .attr('height', chartHeight);
    svg.append('g').attr('id', 'cells-group');
    component.skylineContainer = svg.append('g').attr('id', 'skyline-group');
    component.gradelineContainer = svg.append('g').attr('id', 'gradeline-group');
    component.prerequisiteContainer = svg.append('g').attr('id', 'prerequisite-group');
    component.proficiencyChartContainer = svg;
    proficiencyChartData.map((domainChartData: any) => {
      component.drawDomainChart(domainChartData);
    });
    component.drawProficiencySkyline();
    component.isLoading = false;
  }

  public drawDomainChart(domainChartData: any) {
    const component = this;
    const svg = d3.select('#cells-group');
    const cellWidth = component.cellWidth;
    const cellHeight = component.cellHeight;
    let competencySeq = -1;
    const domainGroup = svg.append('g').attr('id', `domain-group-${domainChartData.domainSeq}`);
    const competencyCells = domainGroup.selectAll('.competency').data(domainChartData.competencies);
    let maxSeq: any = domainChartData.competencies.filter(
      (competency: any) => (competency.className && competency.className !== ''));
    maxSeq = maxSeq.length ? maxSeq[maxSeq.length - 1] : 0;
    competencyCells
      .enter()
      .append('rect')
      .attr('class', (competency: any) => {
        const skylineClassName = competency.isSkyLineCompetency
          ? 'skyline-competency '
          : '';
        const prerequisite = component.prerequisites.find(
          (item: any) => (item.id === competency.competencyCode) &&
             (competency.domainSeq !== component.activeCompetency.domainSeq));
        const isActiveClass = (component.activeCompetency && this.isSelectedCompetency) ?
          (component.activeCompetency.competencyCode === competency.competencyCode) : false;
        const gradeBoundaryClassName = competency.className ? competency.className : '';
        const fadeClass = (maxSeq) ? (
          (maxSeq.competencySeq < competency.competencySeq) ? 'non-competency' : '') : '';

        return `${skylineClassName}domain-${competency.domainSeq} competency-${
          competency.competencySeq
          } ${fadeClass} ${((prerequisite || isActiveClass) && this.isCompetencyMap) ?
            'prerequisite-content' : ((this.isSelectedCompetency && this.isCompetencyMap) ?
              'non-competency' : '')} competency-status-fill-${competency.competencyStatus} ${gradeBoundaryClassName}`;
      })
      .attr('id', 'competency-cell')
      .attr('width', cellWidth)
      .attr('height', cellHeight)
      .attr('x', (competency: any) => (competency.domainSeq - 1) * cellWidth)
      .attr('y', (competency: any) => {
        competencySeq++;
        return competencySeq * cellHeight;
      })
      .on('click', (competency: any) => {
        component.selectCompetency(competency);
        if (this.isCompetencyMap) {
          component.isSelectedCompetency = true;
        }
      });
    competencyCells.exit().remove();
  }

  public drawGradeBoundaryLine(gradeIndex = null) {
    const component = this;
    const skylineElements: any = component.$el.querySelectorAll(`.grade-boundary-competency-${gradeIndex}`);
    const cellWidth = component.cellWidth;
    const cellHeight = component.cellHeight;
    const skylineContainer = component.gradelineContainer;
    skylineElements.forEach((skylineElement: any, elementIndex: number) => {
      const x1 = parseInt(skylineElement.getAttribute('x'), 10);
      const y1 = parseInt(skylineElement.getAttribute('y'), 10);
      const linePoints = component.getHorizontalLinePoints(x1, y1);
      skylineContainer
        .append('line')
        .attr('x1', linePoints.x1)
        .attr('y1', linePoints.y1)
        .attr('x2', linePoints.x2)
        .attr('y2', linePoints.y2)
        .attr('class', `line-${gradeIndex}-${elementIndex}`);
      component.joinGradelineVerticalPoints(elementIndex, linePoints, gradeIndex);
    });
  }

  public getHorizontalLinePoints(x1: number, y1: number, alignmentPixes: number = 0) {
    const component = this;
    const cellHeight = component.cellHeight;
    const cellWidth = component.cellWidth;
    y1 = y1 === 0 ? y1 : y1 + cellHeight;
    const x2 = x1 + cellWidth;
    const y2 = y1;
    return {
      x1,
      y1,
      x2,
      y2,
    };
  }

  /**
   * @function joinSkyLinePoints
   * Method to draw vertical line to connects sky line points, if necessary
   */
  public joinSkylineVerticalPoints(skylineStartPos: number, skylineEndPoint: any) {
    const component = this;
    const skylineStartElement: any = this.$el.querySelector(`#skyline-group .line-${skylineStartPos - 1}`);
    if (skylineStartElement) {
      const skyLineContainer = component.skylineContainer;
      const skylineStartPoint: any = {
        x2: parseInt(skylineStartElement.getAttribute('x2'), 10),
        y2: parseInt(skylineStartElement.getAttribute('y2'), 10),
      };
      // Connect sky line points if last and current points are not same
      if (
        skylineStartPoint.y2 !== skylineEndPoint.y1
      ) {
        // Increase extra height to connect intersection points
        if (skylineStartPoint.y2 > skylineEndPoint.y1) {
          skylineStartPoint.y2 = skylineStartPoint.y2 + 3;
          skylineEndPoint.y1 = skylineEndPoint.y1 - 3;
        } else {
          skylineStartPoint.y2 = skylineStartPoint.y2 - 3;
          skylineEndPoint.y1 = skylineEndPoint.y1 + 3;
        }

        skyLineContainer
          .append('line')
          .attr('x1', skylineStartPoint.x2)
          .attr('y1', skylineStartPoint.y2)
          .attr('x2', skylineEndPoint.x1)
          .attr('y2', skylineEndPoint.y1)
          .attr('class', `skyline connect-line-${skylineStartPos - 1}-line-${skylineStartPos}`);
      }
    }
  }

  /**
   * @function joinSkyLinePoints
   * Method to draw vertical line to connects sky line points, if necessary
   */
  public joinGradelineVerticalPoints(skylineStartPos: number, skylineEndPoint: any, gradeIndex: any) {
    const component = this;
    const skylineStartElement: any | void = this.$el.querySelector(
      `#gradeline-group .line-${gradeIndex}-${skylineStartPos - 1}`);
    if (skylineStartElement) {
      const skyLineContainer = component.gradelineContainer;
      const skylineStartPoint: any | void = {
        x2: parseInt(skylineStartElement.getAttribute('x2'), 10),
        y2: parseInt(skylineStartElement.getAttribute('y2'), 10),
      };
      // Connect sky line points if last and current points are not same
      if (
        skylineStartPoint.y2 !== skylineEndPoint.y1
      ) {
        // Increase extra height to connect intersection points
        if (skylineStartPoint.y2 > skylineEndPoint.y1) {
          skylineStartPoint.y2 = skylineStartPoint.y2 + 2;
          skylineEndPoint.y1 = skylineEndPoint.y1 - 2;
        } else {
          skylineStartPoint.y2 = skylineStartPoint.y2 - 2;
          skylineEndPoint.y1 = skylineEndPoint.y1 + 2;
        }

        skyLineContainer
          .append('line')
          .attr('x1', skylineStartPoint.x2)
          .attr('y1', skylineStartPoint.y2)
          .attr('x2', skylineEndPoint.x1)
          .attr('y2', skylineEndPoint.y1)
          .attr('class', `connect-line-${skylineStartPos - 1}-line-${skylineStartPos}`);
      }
    }
  }

  /**
   * @function showDropShadow
   * Method to show a drop shadow in skyline
   */
  public addSkylineBackshadow() {
    const component = this;
    const skylineContainer = component.skylineContainer;
    const filterContainer = skylineContainer
      .append('defs')
      .append('filter')
      .attr('id', 'back-shadow');
    filterContainer
      .append('feDropShadow')
      .attr('dx', '0')
      .attr('dy', '0')
      .attr('stdDeviation', '4');
    skylineContainer
      .append('line')
      .attr('x1', 0)
      .attr('y1', 30)
      .attr('x2', 0)
      .attr('y2', 30)
      .attr('class', `skyline-shadow`);
  }

  public fetchUserDomainCompetencyMatrix() {
    const month = Number(this.month);
    const year = Number(this.year);
    const params = {
      user: this.userId,
      subject: this.subjectCode,
      month,
      year,
    };
    return competencyAPI.fetchUserDomainCompetencyMatrix(params);
  }

  public fetchMatrixCoOrdinates() {
    const params = {
      subject: this.subjectCode,
    };
    return competencyAPI.getCompetencyMatrixCoordinates(params);
  }

  public selectCompetency(competency: any) {
    const component = this;
    component.activeCompetency = competency;
    if (component.isShowExpandedGraph) {
      this.$emit('onSelectCompetency', competency);
    } else {
      const activeDomain = component.chartData.find((domain: DomainModel) => {
        return domain.domainCode === competency.domainCode;
      });
      component.onSelectDomain(activeDomain);
    }
    if (!this.isCompetencyMap) {
      component.highlightCompetency(competency);
    }
  }

  @Watch('isDomainActive')
  private onToggleDomain() {
    if (!this.isDomainActive) {
      this.toggleActiveDomainBar(0, false);
    } else {
      this.toggleActiveDomainBar(this.activeDomainSeq, true);
    }
  }

  @Watch('isCompetencyActive')
  private onToggleCompetency(value: any) {
    if (value) {
      this.highlightCompetency(this.activeCompetency);
    }
  }

  private onClearGrade() {
    d3.select('#gradeline-group').remove();
  }

  @Watch('month')
  private onChangeTimeline() {
    const component = this;
    component.loadChartData();
  }

  private drawProficiencySkyline() {
    const component = this;
    const skylineElements: any = component.$el.querySelectorAll('.skyline-competency');
    const cellWidth = component.cellWidth;
    const cellHeight = component.cellHeight;
    d3.select('#skyline-group line').remove(); // Remove skyline, if exist
    const skylineContainer = component.skylineContainer;
    skylineElements.forEach((skylineElement: any, elementIndex: number) => {
      const x1 = parseInt(skylineElement.getAttribute('x'), 10);
      const y1 = parseInt(skylineElement.getAttribute('y'), 10);
      const linePoint = component.getHorizontalLinePoints(x1, y1);
      skylineContainer
        .append('line')
        .attr('x1', linePoint.x1)
        .attr('y1', linePoint.y1)
        .attr('x2', linePoint.x2)
        .attr('y2', linePoint.y2)
        .attr('class', `skyline line-${elementIndex}`);
      component.joinSkylineVerticalPoints(elementIndex, linePoint);
    });
    component.addSkylineBackshadow();
  }

  private toggleActiveDomainBar(seq: number, isActive: boolean = true) {
    const component = this;
    component.domainCoOrdinates.forEach((domainCoOrdinate: any) => {
      const domainBar: any = component.$el.querySelector(`#domain-group-${domainCoOrdinate.domainSeq}`);
      domainBar.classList.remove('non-active', 'active');
      if (isActive) {
        domainBar.classList.add('non-active');
      }
    });
    if (seq > 0) {
      const activeDomainBar: any = component.$el.querySelector(`#domain-group-${seq}`);
      activeDomainBar.classList.add('active');
      activeDomainBar.classList.remove('non-active');
    }
  }

  private highlightCompetency(competency: CompetencyModel) {
    const component = this;
    const competencyContainer: any = component.$el.querySelector(
      `.domain-${competency.domainSeq}.competency-${competency.competencySeq}`);
    const rect = competencyContainer.getBoundingClientRect();
    const scrollLeft: any = window.pageXOffset;
    const scrollTop: any = window.pageYOffset;
    const domainSeq: number | any = competency.domainSeq;
    const competencySeq = competency.competencySeq;
    component.activeCompetencyStyle = {
      left: (domainSeq - 1) * component.cellWidth + 'px',
      top: (competencySeq - 1) * component.cellHeight + 'px',
      width: component.cellWidth + 'px',
      height: component.cellHeight + 'px',
    };
  }

  private isActiveGradeList(value: any) {
    return this.activeGradeList.find((grade: any) => grade.id === value.id);
  }

  private drawPrerequisitesLine() {
    const prerequisiteElement: any = this.$el.querySelectorAll('.prerequisite-content');
    const cellWidth = this.cellWidth;
    const cellHeight = this.cellHeight;
    const prerequisiteContainer = this.prerequisiteContainer;
    const linePoints: any = [];
    this.highlightCompetency(this.activeCompetency);
    prerequisiteElement.forEach((element: any, elementIndex: number) => {
      const x1 = parseInt(element.getAttribute('x'), 10);
      const y1 = parseInt(element.getAttribute('y'), 10);
      linePoints.push({
        x: (x1 + (cellWidth / 2)),
        y: (y1 + (cellHeight / 2)),
      });
      prerequisiteContainer
        .append('circle')
        .attr('class', 'pre-connect')
        .attr('cx', (x1 + (cellWidth / 2)))
        .attr('cy', (y1 + (cellHeight / 2)))
        .attr('r', 5)
        .style('fill', '#fff');
    });
    const line = d3.line()
      .x((d: any) => d.x)
      .y((d: any) => d.y)
      .curve(d3.curveLinear);

    prerequisiteContainer.append('path')
      .attr('d', line(linePoints))
      .attr('stroke', '#fff')
      .attr('stroke-width', 4)
      .attr('fill', 'none');

  }


}
