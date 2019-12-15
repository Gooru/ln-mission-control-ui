import { Component, Vue, Prop } from 'vue-property-decorator';
import TexasLineChart from '@/components/charts/texas-line-chart/texas-line-chart';
import GoogleMaterialIcon from '@/components/icons/google-material-icon/google-material-icon';
import { getSum } from '@/utils/utils';
import AtcChart from '@/components/charts/atc-chart/atc-chart';

@Component({
    name: 'texas-chart',
    components: {
        'texas-line-chart': TexasLineChart,
        'material-icon': GoogleMaterialIcon,
        'atc-view': AtcChart,
    },
})

export default class TexasChart extends Vue {

    // -------------------------------------------------------------------------
    // Properties
    @Prop()
    private dataList: any;
    @Prop()
    private seletedLevel?: string;
    @Prop()
    private breadcrumb?: any;

    private hideScore: boolean = false;

    get totalCompetencyGained() {
        const dataList = this.dataList.data ? this.dataList.data : this.dataList;
        return dataList.length ? getSum(dataList, 'completedCompetencies') : 0;
    }
    // ----------------------------------------------------------------------
    // Hooks

    // -------------------------------------------------------------------------
    // Actions

    private onChangeBreadcrumb(seletedLevel: any) {
        this.$emit('onChangeBreadcrumb', seletedLevel);
    }

    private onBack() {
       this.$emit('onBack');
    }
    // --------------------------------------------------------------------------
    // Methods




}
