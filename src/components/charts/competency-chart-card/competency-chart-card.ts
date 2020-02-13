import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import moment from 'moment';
import * as d3 from 'd3';
import axios from 'axios';
import { DomainModel } from '@/models/proficiency/domain';
import { CompetencyModel } from '@/models/proficiency/competency';
import { sessionService } from '@/providers/services/auth/session';
import { competencyAPI } from '@/providers/apis/competency/competency';

@Component({
    name: 'competency-chart-card',
})

export default class CompetencyChartCard extends Vue {

    // ----------------------------------------------------------------
    // Properties
    @Prop()
    private subjectCode: any;

    private month: string = moment().format('MM');

    private year: string = moment().format('YYYY');

    private domainMatrix?: any = [];

    private matrixCoOrdinates?: any = [];

    private domainProficiencyData?: any = [];

    private isLoading: boolean = false;

    private userId() {
        const session = sessionService.getSession();
        return session ? session.user_id : '';
    }


    @Watch('subjectCode')
    private watchSubjectCode(code: any) {
        this.loadProficiencyData(code);
    }

    // -----------------------------------------------------------------
    // Hooks
    private mounted() {
        this.loadProficiencyData(this.subjectCode);
    }

    // ------------------------------------------------------------------
    // Methods

    private drawLineChart(data: any) {
        d3.select(this.$el).select('svg').remove();
        const width = this.$el.clientWidth;
        const height = 150;
        // append the svg object to the body of the page
        const svg = d3.select(this.$el)
            .append('svg')
            .attr('width', width)
            .attr('height', height)
            .append('g')
            .attr('transform', 'translate(' + 0 + ',' + 0 + ')');

        const maxValue: any = d3.max(data, (d: any) => d.totalCompetencies);

        const barPadding = 2;
        const barWidth = (width / data.length);

        svg.selectAll('rect')
            .data(data)
            .enter()
            .append('rect')
            .attr('y', (d: any) => {
                return (100 - ((d.totalCompetencies / maxValue) * 100)) + '%';
            })
            .attr('height', (d: any) => {
                return (d.totalCompetencies / maxValue) * 100 + '%';
            })
            .attr('width', barWidth - barPadding)
            .style('fill', '#016aae')
            .attr('transform', (d, i) => {
                const translate = [barWidth * i, 0];
                return 'translate(' + translate + ')';
            });
    }

    private loadProficiencyData(subjectCode: any) {
        const domainMatrixPromise = this.fetchUserDomainCompetencyMatrix(subjectCode);
        const matrixCoOrdinatesPromise = this.fetchMatrixCoOrdinates(subjectCode);
        this.isLoading = true;
        axios.all([domainMatrixPromise, matrixCoOrdinatesPromise]).then(
            axios.spread(async (domainMatrix: any, matrixCoOrdinates: any) => {
                this.domainMatrix = domainMatrix;
                this.matrixCoOrdinates = matrixCoOrdinates.domains;
                this.isLoading = false;
                this.drawLineChart(this.parseChartData(matrixCoOrdinates.domains, domainMatrix));
            }));
    }

    private parseChartData(domainCoOrdinates: DomainModel[], domainCompetencyMatrix: DomainModel[]) {
        const chartData: any[] = [];
        domainCoOrdinates.map((domainCoOrdinate) => {
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
                totalCompetencies: 0,
            };
            competencies.map((competency: CompetencyModel) => {
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
                domainChartData.totalCompetencies = domainChartData.notstartedCompetencies
                    + domainChartData.inprogressCompetencies
                    + domainChartData.masteredCompetencies;
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

    private fetchUserDomainCompetencyMatrix(subjectCode: string) {
        const params = {
            user: this.userId(),
            subject: subjectCode,
            month: Number(this.month),
            year: Number(this.year),
        };
        return competencyAPI.fetchUserDomainCompetencyMatrix(params);
    }

    private fetchMatrixCoOrdinates(subjectCode: string) {
        const params = {
            subject: subjectCode,
        };
        return competencyAPI.getCompetencyMatrixCoordinates(params);
    }

}
