import {Component, Vue, Prop} from 'vue-property-decorator';
import GoogleMaterialIcon from '@/components/icons/google-material-icon/google-material-icon';
import CompetencyGainedPullup from './competency-gained-pullup/competency-gained-pullup';
import axios from 'axios';
import { perfomanceAPI } from '@/providers/apis/performance/performance';
import { getSum } from '@/utils/utils';
import moment from 'moment';

@Component({
    name: 'competency-gained-card',
    components: {
        'material-icon': GoogleMaterialIcon,
        'competency-gained-pullup': CompetencyGainedPullup,
    },
})

export default class CompentencyGainedCard extends Vue {

    // ------------------------------------------------------------
    // Properties
    @Prop()
    private dataList: any;
    @Prop()
    private averagePerformance: any;
    @Prop()
    private countryData: any;
    @Prop()
    private selectedDate?: string;
    @Prop()
    private subjectsList?: any;

    private isShowCompetency: boolean = false;

    private districtList: any  = [];

    private dataSet: any = {};

    private totalCompetencyGained: number = getSum(this.dataList);

    // ------------------------------------------------------------
    // Actions

    private onGoBack(show: boolean = false) {
        this.isShowCompetency = show;
    }

    // ---------------------------------------------------------------
    // Hooks


}
