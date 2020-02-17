import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import GoogleMaterialIcon from '@/components/icons/google-material-icon/google-material-icon';
import { searchAPI } from '@/providers/apis/search/search';
import Axios from 'axios';
import MCIcon from '@/components/icons/mc-icon/mc-icon';
import { SessionService, sessionService } from '@/providers/services/auth/session';

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

    @Prop()
    private microCompetency: any;

    private isActive: any = true;

    get signatureCollection() {
        return this.learningMapContent.signatureCollections;
    }

    get signatureAssessment() {
        return this.learningMapContent.signatureAssessments;
    }
    // --------------------------------------------------------------------------
    // Actions

    private onChangeTab(action: boolean) {
        this.isActive = action;
    }

    private onClose() {
        this.$emit('onClose');
    }

    private onSelectContent(content: string) {
        this.$emit('onSelectContent', content);
    }
}
