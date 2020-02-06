import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { competencyAPI } from '@/providers/apis/competency/competency';
import { FacetMatrix } from '@/models/proficiency/facet-matrix';
import { FacetMatrixCount } from '@/models/proficiency/facet-matrix-count';
import { FacetCompetenciesCount } from '@/models/proficiency/facet-competencies-count';
import { SubjectModel } from '@/models/taxonomy/subject';
import * as d3 from 'd3';
import moment from 'moment';

@Component({
  name: 'learner-across-facets-chart',
  filters: {
    extractClassification(subjectCode: string) {
      return subjectCode ? subjectCode.split('.')[0] : '';
    },
  },
})
export default class LearnerAcrossFacetsChart extends Vue {

  @Prop()
  private userId!: string;

  @Prop()
  private month: string = moment().format('MM');

  @Prop()
  private year: string = moment().format('YYYY');

  private facetsCompetencyMatrix: FacetMatrix[] = [];

  private facetsCompetencyMatrixData: any;

  private maxFacetCompetenciesCount: number = 0;

  private skylinePoints: any = [];

  private activeFacet: any = {};

  @Prop()
  private facets!: SubjectModel[];

  private maxFacetWidth: number = 90;

  private minFacetWidth: number = 40;

  private tooltipInfo: any = {};

  private tooltipPos: any = {};

  private isShowTooltip: boolean = false;

  private facetWidth: number = 40;

  @Prop()
  private isExpandedMode: boolean = true;

  @Watch('month')
  public onChageTimeline() {
    this.skylinePoints = [];
    this.loadFacetsCompetencyMatrixData();
  }

  public created() {
    this.loadFacetsCompetencyMatrixData();
  }

  @Watch('facets')
  private onUpdateFacets() {
    this.skylinePoints = [];
    this.loadChartData();
  }

  @Watch('isExpandedMode')
  private onToggleFacetChart() {
    const component = this;
    this.skylinePoints = [];
    component.loadChartData();
    // Scroll to bottom of the chart while in full view
    const chartContainer = component.$el.querySelector('#facets-chart-view') as HTMLElement;
    chartContainer.scrollTop = chartContainer.scrollHeight;
  }

  private loadFacetsCompetencyMatrixData() {
    const component = this;
    const requestParams = {
      user: component.userId,
      month: Number(component.month),
      year: Number(component.year),
    };
    competencyAPI.fetchAllFacetsCompetencyMatrix(requestParams).then((facetsCompetencyMatrix: FacetMatrix[]) => {
      component.parseFacetsCompetencyMatrix(facetsCompetencyMatrix);
    });
  }

  private parseFacetsCompetencyMatrix(facetsCompetencyMatrix: FacetMatrix[]) {
    const component = this;
    let maxFacetCompetenciesCount = 0;
    const parsedFacetsCompetencyMatrix: any =
      facetsCompetencyMatrix.map( (facetCompetencyMatrix: FacetMatrix) => {
      const competencyStats = facetCompetencyMatrix.competencyStats;
      let totalCompetenciesCount = 0;
      let masteredCompetenciesCount = 0;
      let inprogressCompetenciescount = 0;
      let notstartedCompetenciescount = 0;
      const competencyStatusCount = competencyStats.map( (competencyStat: FacetMatrixCount) => {
        const competencyStatus = competencyStat.competencyStatus;
        const competenciesCount = competencyStat.competencyCount;
        if (competencyStatus >= 2 && competencyStatus <= 5) {
          masteredCompetenciesCount += competenciesCount;
        } else if (competencyStatus === 1) {
          inprogressCompetenciescount += competenciesCount;
        } else {
          notstartedCompetenciescount += competenciesCount;
        }
      });
      const facetCompetenciesCount = [
        {
          status: 'mastered',
          count: masteredCompetenciesCount,
        },
        {
          status: 'inprogress',
          count: inprogressCompetenciescount,
        },
        {
          status: 'notstarted',
          count: notstartedCompetenciescount,
        },
      ];
      let parsedFacetCompetencyMatrix: any = {
        competenciesCount: facetCompetenciesCount,
      };
      parsedFacetCompetencyMatrix = Object.assign(parsedFacetCompetencyMatrix, facetCompetencyMatrix);
      totalCompetenciesCount = masteredCompetenciesCount + inprogressCompetenciescount + notstartedCompetenciescount;
      parsedFacetCompetencyMatrix.totalCompetenciesCount = totalCompetenciesCount;
      maxFacetCompetenciesCount = totalCompetenciesCount > maxFacetCompetenciesCount ?
        totalCompetenciesCount :
        maxFacetCompetenciesCount;
      return parsedFacetCompetencyMatrix;
    });
    // component.maxFacetCompetenciesCount = maxFacetCompetenciesCount;
    component.facetsCompetencyMatrixData = parsedFacetsCompetencyMatrix;
    component.loadChartData();
  }

  private loadChartData() {
    const component = this;
    const facets = component.facets;
    const facetsCompetencyMatrixData = component.facetsCompetencyMatrixData;
    let maxFacetCompetenciesCount: any = 0;
    const activeFacetsMatrix: FacetMatrix[] = facets.map((facet: SubjectModel) => {
      return facetsCompetencyMatrixData.find(
        (facetCompetencyMatrix: FacetMatrix) => facetCompetencyMatrix.subjectCode === facet.code );
    });
    activeFacetsMatrix.map( (activeFacetMatrix: FacetMatrix | any) => {
      maxFacetCompetenciesCount = activeFacetMatrix.totalCompetenciesCount > maxFacetCompetenciesCount ?
       activeFacetMatrix.totalCompetenciesCount :
        maxFacetCompetenciesCount;
    });
    component.maxFacetCompetenciesCount = maxFacetCompetenciesCount;
    component.drawFacetsChart(activeFacetsMatrix);
  }

  private drawFacetsChart(facetsMatrix: FacetMatrix[]) {
    const component = this;
    d3.select('#chart-container').remove();

    const chartViewElement = component.$el.querySelector('#facets-chart-view') as HTMLElement;
    let chartWidth = chartViewElement.offsetWidth - 60;
    let chartHeight = chartViewElement.offsetHeight - 40;
    const totalFacets = facetsMatrix.length || 0;
    // Set virtual height of chart based on expand/collapse mode
    if (this.isExpandedMode) {
      let totalCompetencies: number | any = 0;
      let highestMasteredCount: number | any = 0;
      let highestFacetCount: number | any = 0;
      facetsMatrix.map((facet: FacetMatrix| any) => {
        const facetMasteredCount: FacetCompetenciesCount | any = facet.competenciesCount.find(
          (competencyCount: FacetCompetenciesCount) => competencyCount.status === 'mastered',
        );
        highestMasteredCount = highestMasteredCount < facetMasteredCount.count
          ? facetMasteredCount.count : highestMasteredCount;
        totalCompetencies += facet.totalCompetenciesCount;
        highestFacetCount = highestFacetCount < facet.totalCompetenciesCount
          ? facet.totalCompetenciesCount : highestFacetCount;
      });
      if (highestMasteredCount) {
        // When there are mastered competencies available in a facet,
        // Logically the skyline points are created as boxed container based on
        // -highest facet count. Each box is 75% height of the chart container.
        const container75Percent = (chartHeight / 100) * 75;
        const numberOfSkylineBoxes = highestFacetCount / highestMasteredCount;
        chartHeight = container75Percent * numberOfSkylineBoxes;
      } else {
        const meanValue = totalCompetencies / facetsMatrix.length;
        chartHeight = meanValue + (meanValue / 100);
      }
    }

    // const facetColumnWidth = Number(chartWidth / totalFacets);
    const facetColumnWidth = component.maxFacetWidth * totalFacets > chartWidth ?
     chartWidth / totalFacets :
      component.maxFacetWidth;
    component.facetWidth = facetColumnWidth;
    chartWidth = facetColumnWidth * totalFacets > chartWidth ? chartWidth : facetColumnWidth * totalFacets;
    const svg = d3.select('#facets-chart-view')
      .append('svg').attr('id', 'chart-container')
      .attr('width', chartWidth ).attr('height', chartHeight);
    const facetsGroup = svg.append('g').attr('id', 'facets-group');
    const skylineGroup = svg.append('g').attr('id', 'skyline-group');
    facetsMatrix.forEach((facetMatrix: FacetMatrix, seq: number) => {
      component.drawFacetColumn(facetMatrix, chartHeight, facetColumnWidth, seq);
    });
    component.drawSkyline();
    // Scroll to bottom of the chart while in full view
    chartViewElement.scrollTop = chartViewElement.scrollHeight;
  }

  private drawFacetColumn(
    facetMatrix: FacetMatrix | any,
    chartHeight: number,
    width: number = this.maxFacetWidth,
    seq = 0) {
    const component = this;
    // value: number => utilized as threshold 100% of bar
    const chartHeightLevel = component.maxFacetCompetenciesCount;
    const facetsGroup = d3.select('#facets-group');
    let yAxis = 0;
    const chartViewElement: any = component.$el.querySelector('#facets-chart-view') as HTMLElement;
    // const chartHeight: number = chartViewElement.offsetHeight - 45;
    chartHeight = chartHeight - 5;
    facetMatrix.competenciesCount.forEach( (competency: any ) => {
    let height = competency.count / chartHeightLevel * 100;
    height = Number((height * chartHeight) / 100);
    facetsGroup
        .append('rect')
        .attr('class', `${competency.status}`)
        .attr('x', width * seq)
        .attr('y', `${yAxis}`)
        .attr('width', width)
        .attr('height', `${height}`)
        .on('click', () => {
          component.selectFacet(facetMatrix);
        })
        .on('mousemove', (event) => {
          component.tooltipPos = {
            left: `${d3.event.pageX - 90}px`,
            top: `${d3.event.pageY - 130}px`,
          };
          component.tooltipInfo = facetMatrix;
          component.isShowTooltip = true;
        })
        .on('mouseout', () => {
          component.isShowTooltip = false;
        });
    if (competency.status === 'mastered') {
        component.skylinePoints.push({
          x1: width * seq,
          y1: height,
          x2: width * seq + width,
          y2: height,
        });
      }

    yAxis = yAxis + height;
    });
  }

  private drawSkyline() {
    const component = this;
    const skylineGroup = d3.select('#skyline-group');
    const skylinePoints = component.skylinePoints;
    let points = '';
    skylinePoints.map( (skylinePoint: any) => {
      points += ` ${skylinePoint.x1},${skylinePoint.y1} ${skylinePoint.x2},${skylinePoint.y2}`;
    });
    skylineGroup.append('polyline')
      .attr('points', points)
      .attr('class', 'skyline');
    const filterContainer = skylineGroup
      .append('defs')
      .append('filter')
      .attr('id', 'back-shadow');
    filterContainer
      .append('feDropShadow')
      .attr('dx', '0')
      .attr('dy', '0')
      .attr('stdDeviation', '4');
    skylineGroup
      .append('line')
      .attr('x1', 0)
      .attr('y1', 30)
      .attr('x2', 0)
      .attr('y2', 30)
      .attr('class', `skyline-shadow`);
  }

  private selectFacet(facetData: any) {
    const component = this;
    this.activeFacet = component.facets.find(
      (facet: SubjectModel) => facet.code === facetData.subjectCode);
    this.$emit('onSelectSubject', this.activeFacet);
  }
}
