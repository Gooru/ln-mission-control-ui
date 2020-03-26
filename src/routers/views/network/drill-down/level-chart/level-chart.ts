import { Component, Vue, Prop } from 'vue-property-decorator';
import LineChart from '@/components/charts/line-chart/line-chart';
import GoogleMaterialIcon from '@/components/icons/google-material-icon/google-material-icon';
import { getSum } from '@/utils/utils';
import AtcChart from '@/components/charts/atc-chart/atc-chart';
import { CompetencyModel } from '@/models/drill-down/competency';
import { DrillDownModel } from '@/models/drill-down/drill-down';
import { numberFormat } from '@/helpers/number-format';

@Component({
    name: 'level-chart',
    components: {
        'line-chart': LineChart,
        'material-icon': GoogleMaterialIcon,
        'atc-view': AtcChart,
    },
})

export default class LevelChart extends Vue {

    // -------------------------------------------------------------------------
    // Properties
    @Prop()
    private dataList?: CompetencyModel;
    @Prop()
    private seletedLevel?: DrillDownModel;
    @Prop()
    private breadcrumb?: any;
    @Prop()
    private countryData: any;
    @Prop()
    private studentList: any;

    private hideScore: boolean = false;

    private get totalCompetencyGained() {
        const dataList: any = this.dataList;
        return dataList
        ? dataList.overallStats.totalCompetencies
        : getSum(this.studentList, 'completedCompetencies');
    }

    private get chartData() {
        const dataList = this.dataList ? this.dataList.data : [];
        return dataList ? dataList.sort((a: any, b: any) => a.week - b.week ) : this.studentList;

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

    private numberFormat(value: number) {
        return numberFormat(value);
    }




}
