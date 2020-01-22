import {Component, Vue} from 'vue-property-decorator';
import GoogleMaterialIcon from '@/components/icons/google-material-icon/google-material-icon';
import moment from 'moment';
import {xAPI} from '@/providers/apis/xapi/xapi';

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

    private queryByAgent: string = '';

    private queryByActivity: string = '';
    // ------------------------------------------------------------------------------
    // Action

    private onPost() {
        if (this.postPayload) {
            xAPI.postStatementData(this.postPayload).then(() => {
                this.isShowMessage = true;
                setTimeout(() => {
                    this.isShowMessage = false;
                }, 5000);
            });
        }
    }

    // TODO Need to improve the function once exact requirements is ready
    private onQueryStatements() {
      let queryBy = '';
      let queryValue = '';
      if (this.queryByAgent !== '') {
        queryBy = 'agent';
        queryValue = this.queryByAgent;
      } else if (this.queryByActivity !== '') {
        queryBy = 'activity';
        queryValue = this.queryByActivity;
      }
      const endpoint = 'api/v1/xapi/statements';
      const currentUrl = window.location.protocol + '//' + window.location.hostname;
      const getStatementsUrl = `${currentUrl}/${endpoint}?${queryBy}=${queryValue}`;
      window.open(getStatementsUrl, 'xapi-statement');
      // xAPI.queryStatements(queryBy).then((statements) => {
      //   console.log('statements', statements);
      // })
    }

    private onGoBack() {
        this.$router.go(-1);
    }

}
