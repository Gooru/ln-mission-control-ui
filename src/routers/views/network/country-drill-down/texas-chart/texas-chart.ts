import { Component, Vue, Prop } from 'vue-property-decorator';
import TexasLineChart from '@/components/charts/texas-line-chart/texas-line-chart';
import GoogleMaterialIcon from '@/components/icons/google-material-icon/google-material-icon';
import { getSum } from '@/utils/utils';

@Component({
    name: 'texas-chart',
    components: {
        'texas-line-chart': TexasLineChart,
        'material-icon': GoogleMaterialIcon,
    },
})

export default class TexasChart extends Vue {

    // -------------------------------------------------------------------------
    // Properties
    @Prop()
    private dataList: any;
    @Prop()
    private cardTitle?: string;

    private totalCompetencyGained: number = getSum(this.dataList);



    // ----------------------------------------------------------------------
    // Hooks
    // --------------------------------------------------------------------------
    // Methods




}
