import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import GoogleMaterialIcon from '@/components/icons/google-material-icon/google-material-icon';
import { searchAPI } from '@/providers/apis/search/search';
import Axios from 'axios';
import MCIcon from '@/components/icons/mc-icon/mc-icon';

@Component({
    name: 'competency-card',
    components: {
        'material-icon': GoogleMaterialIcon,
        'mc-icon': MCIcon,
    },
})

export default class CompetencyCard extends Vue {

    // ----------------------------------------------------------------------
    // Properties
    @Prop()
    private activeCompetency: any;

    @Prop()
    private prerequisites: any;

    @Prop()
    private learningMapContent: any;

    private isActive: any = true;

    // --------------------------------------------------------------------------
    // Actions

    private onChangeTab(action: boolean) {
        this.isActive = action;
    }

    private onClose() {
        this.$emit('onClose');
    }


}
