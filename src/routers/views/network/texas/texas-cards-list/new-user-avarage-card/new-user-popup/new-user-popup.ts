import {Component, Vue, Prop} from 'vue-property-decorator';
import GoogleMaterialIcon from '@/components/icons/google-material-icon/google-material-icon';
import PerformanceProgress from '@/components/charts/performance-progress/performance-progress';
import DountChart from '@/components/charts/dount-chart/dount-chart';

@Component({
    name: 'new-user-popup',
    components: {
        'material-icon': GoogleMaterialIcon,
        'performance-bar': PerformanceProgress,
        'dount-chart': DountChart,
    },
})

export default class NewUserPopup extends Vue {

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

    private dataList?: any = [{
    id: 1,
    name: 'Baster',
    code: '2215',
    type: 'system',
    sub_type: 'district',
    timespent: 23,
    performance: 45.6,
    completed_competencies: 100,
        inprogress_competencies: 50,
  }, {
    id: 2,
    name: 'DHAMTARI',
    code: '2213',
    type: 'system',
    sub_type: 'district',
    timespent: 986,
    performance: 85.1,
  completed_competencies: 80,
inprogress_competencies: 20,
  }];

    private get level() {
        return this.dataList[0].sub_type;
    }

    // -----------------------------------------------------------------------
    // Actions

    private onGoBack() {
        this.$emit('onGoBack', false);
    }

    // ------------------------------------------------------------------------
    // Hooks


    // --------------------------------------------------------------------------
    // Methods

}
