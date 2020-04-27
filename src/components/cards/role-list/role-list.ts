import { Vue, Component } from 'vue-property-decorator';
import GoogleMaterialIcon from '@/components/icons/google-material-icon/google-material-icon';
import { demoUser } from '@/providers/apis/demo-user/demo-user';
import { authAPI } from '@/providers/apis/auth/auth';
import { appConfigAPI } from '@/providers/apis/app/app-config';
import { appConfigService } from '@/providers/services/app/app-config';
import { sessionService } from '@/providers/services/auth/session';

@Component({
    name: 'role-list',
    components: {
        'material-icon': GoogleMaterialIcon,
    },
})

export default class RoleList extends Vue {

    // -------------------------------------------------------------------------
    // Properties

    /**
     * Holding all the user roles data
     */
    private roleList: any = [{
        name: 'Current User',
        code: 'DEMO_USER',
    }];

    /**
     * Help to handle show current user option in menus
     */
    private get showCurrentUser() {
        return sessionService.getDemoSessionCopy() ? true : false;
    }

    // -------------------------------------------------------------------------
    // Hooks

    private created() {
        demoUser.fetchDemoAccounts().then((roles) => {
            this.roleList = [...this.roleList, ...roles];
        });
    }

    // ---------------------------------------------------------------------------------
    // Actions

    /**
     *
     * @param role it has selected role details
     */
    private onChangeRole(role: any) {
        if (role.code !== 'DEMO_USER') {
            this.doLoginInWithCredential(role);
            return;
        }
        const session = sessionService.getDemoSessionCopy();
        if (session) {
            appConfigAPI.getAppPermissions(session.permissions).then((userRole: any) => {
                if (userRole) {
                  appConfigService.setAppUserRole(userRole);
                  sessionService.setSession(session);
                  localStorage.removeItem(sessionService.DEMO_SESSION);
                  this.$router.push(userRole.landingPage);
                  window.location.reload(true);
                }
              }, (onerror) => {
                this.validationToastMessage();
              });
        }

    }

    /**
     * help to login as a demo user
     * @param userDetails holding user login credentials
     */
    private doLoginInWithCredential(userDetails: any) {
        const username = userDetails.username;
        const password = atob(userDetails.password);
        authAPI
            .logInWithCredential(username, password)
            .then(
            (session) => {
            if (!sessionService.getDemoSessionCopy()) {
                sessionService.setDemoSessionCopy();
            }
            appConfigAPI.getAppPermissions(session.permissions).then((userRole: any) => {
                if (userRole) {
                  appConfigService.setAppUserRole(userRole);
                  sessionService.setSession(session);
                  this.$router.push(userRole.landingPage);
                  window.location.reload(true);
                }
              }, (onerror) => {
                this.validationToastMessage();
              });
            },
            (onerror) => {
              this.validationToastMessage();
            },
          );
      }

      private validationToastMessage() {
        this.$bvToast.toast(
          this.$i18n.t('errors.login.credentials.not.valid') as string,
          {
            title: this.$i18n.t('errors.login.failed') as string,
            variant: 'danger',
            solid: true,
          },
        );
      }
}
