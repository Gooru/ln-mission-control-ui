import { Component, Vue, Watch } from 'vue-property-decorator';
import { authAPI } from '@/providers/apis/auth/auth';
import { sessionService } from '@/providers/services/auth/session';
import { appConfigAPI } from '@/providers/apis/app/app-config';
import { appConfigService } from '@/providers/services/app/app-config';

@Component
export default class Login extends Vue {
  // -------------------------------------------------------------------------
  // Properties

  /**
   * Property which maintains the value of username or email.
   * @type {String}
   */
  private usernameOrEmail: string = '';

  /**
   * Property which maintains the value of password.
   * @type {String}
   */
  private password: string = '';

  /**
   * Property which decide to allow login or not.
   * @type {Boolean}
   */
  private allowLogin: boolean = false;

  // -------------------------------------------------------------------------
  // Hooks


  // -------------------------------------------------------------------------
  // Watcher's


  // -------------------------------------------------------------------------
  // Actions

  private doLogin() {
    this.doLoginInWithCredential();
  }

  // -------------------------------------------------------------------------
  // Methods

  private validation() {
    if (
      this.usernameOrEmail != null &&
      this.usernameOrEmail.length > 0 &&
      this.password != null &&
      this.password.length > 0
    ) {
      this.allowLogin = true;
    } else {
      this.allowLogin = false;
    }
  }

  private doLoginInWithCredential() {
    this.validation();
    if (this.allowLogin) {
      authAPI
        .logInWithCredential(this.usernameOrEmail, this.password)
        .then(
        (session) => {
          appConfigAPI.getAppPermissions(session.permissions).then((userRole: any) => {
            if (userRole) {
              appConfigService.setAppUserRole(userRole);
              sessionService.setSession(session);
              this.$router.push(userRole.landingPage);
            } else {
              this.validationRoleMessage();
            }
            // const redirect = this.$router.currentRoute.query.redirect;
            // this.$router.push(redirect ? redirect as string : '/network');
          }, (onerror) => {
            this.validationToastMessage();
          });
        },
        (onerror) => {
          this.validationToastMessage();
        },
      );
    }
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

  private validationRoleMessage() {
    this.$bvToast.toast(
      'Don\'t have permission to access any page',
      {
        title: 'Permission Denied',
        variant: 'danger',
        solid: true,
      },
    );
  }
}
