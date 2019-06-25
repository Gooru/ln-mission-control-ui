import { Component, Vue, Watch } from 'vue-property-decorator';
import { authAPI } from '@/providers/apis/auth/auth';
import { sessionService } from '@/providers/services/auth/session';

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
    this.signInWithCredential();
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

  private signInWithCredential() {
    this.validation();
    if (this.allowLogin) {
      authAPI
        .signInWithCredential(this.usernameOrEmail, this.password)
        .subscribe(
        (session) => {
          sessionService.setSession(session);
          const redirect = this.$router.currentRoute.query.redirect;
          this.$router.push(redirect ? redirect as string : '/network');
        },
        (onerror) => {
          this.$bvToast.toast(
            this.$i18n.t('errors.login.credentials.not.valid') as string,
            {
              title: this.$i18n.t('errors.login.failed') as string,
              variant: 'danger',
              solid: true,
            },
          );
        },
      );
    }
  }
}
