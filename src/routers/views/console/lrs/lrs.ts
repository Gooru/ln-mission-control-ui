import {Component, Vue} from 'vue-property-decorator';
import GoogleMaterialIcon from '@/components/icons/google-material-icon/google-material-icon';
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
    private postPayload: any = '';

    /**
     * @property {Object} isShowMessage this property hold the alert message box
     */
    private isShowMessage: boolean = false;

    /**
     * @property {Object} queryData this property hold the query data
     */
    private queryData: any = {};
    // ------------------------------------------------------------------------------
    // Action

    private onPost() {
        if (this.postPayload) {
            consoleAPI.postStatementData(this.postPayload).then(() => {
                this.isShowMessage = true;
                setTimeout(() => {
                    this.isShowMessage = false;
                }, 5000);
            });
        }
    }

}
