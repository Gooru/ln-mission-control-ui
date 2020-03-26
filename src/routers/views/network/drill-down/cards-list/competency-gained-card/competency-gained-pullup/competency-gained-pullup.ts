import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import GoogleMaterialIcon from '@/components/icons/google-material-icon/google-material-icon';
import PerformanceProgress from '@/components/charts/performance-progress/performance-progress';
import DountChart from '@/components/charts/dount-chart/dount-chart';
import { getSum } from '@/utils/utils';
import { PerformanceModel } from '@/models/drill-down/performance';
import { SubjectModel } from '@/models/drill-down/subject';

@Component({
    name: 'competency-gained-pullup',
    components: {
        'material-icon': GoogleMaterialIcon,
        'performance-bar': PerformanceProgress,
        'dount-chart': DountChart,
    },
})

export default class CompetencyGainedPullup extends Vue {

    // --------------------------------------------------------------------
    // Properties
    @Prop()
    private performanceData?: PerformanceModel[];
    @Prop()
    private subjectsList?: SubjectModel[];
    @Prop()
    private countryData: any;
    @Prop()
    private totalPerformance: any;
    @Prop()
    private totalCompetencyGained: any;

    private breadCrumb: any = [];

    private isFirstBreadCrumb: boolean = true;

    get progressPercent() {
        const total = this.totalCompetencyGained;
        const completed: number = total / 100 * getSum(this.performanceData, 'inprogressCompetencies') || 0;
        const inprogress: number = total / 100 * getSum(this.performanceData, 'inprogressCompetencies') || 0;
        const notStarted = 100 - completed - inprogress;
        return {
            completed: completed + '%',
            inprogress: inprogress + '%',
            notStarted: notStarted + '%',
        };
    }
    private get averageDount() {
        return [{
            name: 'chart',
            value: this.totalPerformance,
            color: this.performanceColor(this.totalPerformance),
        },
        {
            name: 'chart1',
            value: 100 - this.totalPerformance,
            color: '#ebeced',
        },
        ];
    }

    private get competencyDount() {
        return [{
            name: 'chart',
            value:  this.performanceData ? getSum(this.performanceData, 'completedCompetencies') : 0,
            color: '#0a66ba',
        },
        {
            name: 'chart1',
            value: this.totalCompetencyGained,
            color: '#ebeced',
        },
        {
            name: 'chart2',
            value:  this.performanceData ?  getSum(this.performanceData, 'inprogressCompetencies') : 0,
            color: '#7ccff7',
        }];
    }

    private get navFromName() {
        return this.breadCrumb.length > 0
        ? this.breadCrumb[this.breadCrumb.length - 1].name : this.countryData.name;
    }
    private get navCurrentName() {
        if (this.breadCrumb.length === 0) { return 'state'; }
        if (this.breadCrumb.length === 1) { return 'district'; }
        if (this.breadCrumb.length >= 2) {
            return this.breadCrumb[this.breadCrumb.length - 1].type === 'system'
                ? this.breadCrumb[this.breadCrumb.length - 1].subType
                : this.breadCrumb[this.breadCrumb.length - 1].type; }
    }


    private hideDiv: boolean = false;

    private get level() {
        const dataList: any = this.performanceData;
        const type = dataList[0].type ? dataList[0].type : 'student';
        return type === 'system' ? dataList[0].subType : type;
    }

    // -----------------------------------------------------------------------
    // Actions

    private onGoBack() {
        this.$emit('onSelectLevel', null);
        this.$emit('onGoBack', false);
    }

    private onSelectLevel(level: any) {
        this.breadCrumb.push(level);
        this.isFirstBreadCrumb = this.breadCrumb[this.breadCrumb.length - 1] ? false : true;
        this.$emit('onSelectLevel', level);
    }

    private levelBack() {
        this.breadCrumb.pop();
        if (!this.isFirstBreadCrumb) {
            this.isFirstBreadCrumb = this.breadCrumb.length > 0 ? false : true;
            const selectedLevel = this.breadCrumb.length
            ? this.breadCrumb[this.breadCrumb.length - 1] : this.countryData;
            this.$emit('onSelectLevel', selectedLevel);
        }

    }

    private onSelectSubject(subject: any) {
        const subjectList: any =  this.subjectsList;
        subjectList.map((subjects: any) => {
            subjects.isActive = false;
        });
        subject.isActive = true;
        this.$emit('onSelectSubject', subject);
    }

    // ------------------------------------------------------------------------
    // Hooks

    // --------------------------------------------------------------------------
    // Methods

    private performanceColor(level: any) {
        if (level > 90) {
            return '#5b8f42';
        } else if (level > 80) {
            return '#a7cf98';
        } else if (level > 60) {
            return '#fac553';
        } else {
            return '#fa787a';
        }
    }

    private getPercentage(competency: any) {
        const total = this.totalCompetencyGained;
        const completed: number = total / 100 * competency.completedCompetencies;
        const inprogress: number = total / 100 * competency.inprogressCompetencies;
        const notStarted = 100 - completed - inprogress;
        return {
            completed: completed + '%',
            inprogress: inprogress + '%',
            notStarted: notStarted + '%',
        };
    }
}
