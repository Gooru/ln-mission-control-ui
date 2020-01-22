import {Component, Vue} from 'vue-property-decorator';
import GoogleMaterialIcon from '@/components/icons/google-material-icon/google-material-icon';
import moment from 'moment';
import {consoleAPI} from '@/providers/apis/console/console';

@Component({
    name: 'lrs-page',
    components: {
        'google-icon': GoogleMaterialIcon,
    },
})

export default class Lrs extends Vue {
    // ------------------------------------------------------------------------------
    // Properties

    /**
     * @property {Object} postAgent this property hold the post data
     */
    private postPayload: any = [];

    /**
     * @property {Object} queryData this property hold the query data
     */
    private queryData: any = {};
    // ------------------------------------------------------------------------------
    // Action

    private onPost() {
        consoleAPI.postStatementData(this.postPayload);
    }

    private objectToString(payload: any) {
        return JSON.stringify(payload);
    }

}
