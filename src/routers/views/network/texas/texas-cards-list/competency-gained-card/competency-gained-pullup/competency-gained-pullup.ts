import {Component, Vue} from 'vue-property-decorator';
import GoogleMaterialIcon from '@/components/icons/google-material-icon/google-material-icon';
import PerformanceProgress from '@/components/charts/performance-progress/performance-progress';
import DountChart from '@/components/charts/dount-chart/dount-chart';

@Component({
    name: 'competency-gained-pullup',
    components: {
        'material-icon': GoogleMaterialIcon,
        'performance-bar': PerformanceProgress,
        'dount-chart': DountChart,
    },
})

export default class CompetencyGainedPullup extends Vue {

    private itrate: any = ['0%', '10%', '30%', '40%', '50%', '60%'];

    private data: any = [{
        name: 'chart',
        value: 530,
        color: '#febb2b',
    },
    {
        name: 'chart1',
        value: 300,
        color: '#ebeced',
    },
    ];

    private data1: any = [{
        name: 'chart',
        value: 530,
        color: '#0a66ba',
    },
    {
        name: 'chart1',
        value: 300,
        color: '#ebeced',
    },
    {
        name: 'chart2',
        value: 400,
        color: '#7ccff7',
    },
    ];


    // -----------------------------------------------------------------------
    // Actions

    private onGoBack() {
        this.$emit('onGoBack', false);
    }


}
