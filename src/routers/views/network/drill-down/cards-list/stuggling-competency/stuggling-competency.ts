import {Component, Vue, Prop} from 'vue-property-decorator';
import GoogleMaterialIcon from '@/components/icons/google-material-icon/google-material-icon';
import PerformanceProgress from '@/components/charts/performance-progress/performance-progress';

@Component({
    name: 'struggling-competency',
    components: {
        'material-icon': GoogleMaterialIcon,
        'progress-bar': PerformanceProgress,
    },
})

export default class StrugglingCompetency extends Vue {

    // --------------------------------------------------------------------------------
    // Properties

    @Prop()
    private strugglingCompetencies: any;
    @Prop()
    private isTenant?: boolean;

    private hiddenData: boolean = false;


    // -------------------------------------------------------------------------------
    // Methods

}
