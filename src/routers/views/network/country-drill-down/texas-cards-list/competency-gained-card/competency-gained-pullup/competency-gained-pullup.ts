import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import GoogleMaterialIcon from '@/components/icons/google-material-icon/google-material-icon';
import PerformanceProgress from '@/components/charts/performance-progress/performance-progress';
import DountChart from '@/components/charts/dount-chart/dount-chart';
import { getSum } from '@/utils/utils';

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
    private dataList: any;
    @Prop()
    private subjectsList: any;

    private breadCrumb: any = [];

    private get averageDount() {
        return [{
            name: 'chart',
            value: 100,
            color: '#febb2b',
        },
        {
            name: 'chart1',
            value: this.perfromanceAverage || 0,
            color: '#ebeced',
        },
        ];
    }

    private get competencyDount() {
        return [{
            name: 'chart',
            value: getSum(this.dataList.data, 'completedCompetencies'),
            color: '#0a66ba',
        },
        {
            name: 'chart1',
            value: 300,
            color: '#ebeced',
        },
        {
            name: 'chart2',
            value: getSum(this.dataList.data, 'inprogressCompetencies'),
            color: '#7ccff7',
        }];
    }

    private get perfromanceAverage() {
        return this.dataList.overallStats ? Math.round(this.dataList.overallStats.averagePerformance) : 0;
    }

    private get competencyGained() {
        return this.dataList.data ? getSum(this.dataList.data, 'completedCompetencies') : 0;
    }

    private hideDiv: boolean = false;

    private get level() {
        const dataList = this.dataList.data ? this.dataList.data : this.dataList;
        const type = dataList[0].type ? dataList[0].type : 'student';
        return type === 'system' ? dataList[0].sub_type : type;
    }

    // -----------------------------------------------------------------------
    // Actions

    private onGoBack() {
        this.$emit('onSelectLevel', null);
        this.$emit('onGoBack', false);
    }

    private onSelectLevel(level: any) {
        this.breadCrumb.push(level);
        this.$emit('onSelectLevel', level);
    }

    private levelBack() {
        this.breadCrumb.pop();
        const selectedLevel = this.breadCrumb.length ? this.breadCrumb[this.breadCrumb.length - 1] : null;
        this.$emit('onSelectLevel', selectedLevel);
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
}
