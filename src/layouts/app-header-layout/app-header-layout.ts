import { Component, Vue } from 'vue-property-decorator';
import { sessionService } from '@/providers/services/auth/session';
import { Events } from '@/events';
import AppNav from '@/components/app-nav/app-nav.vue';
import { authAPI } from '@/providers/apis/auth/auth';

@Component({
  components: {
    AppNav,
  },
})
export default class AppHeaderLayout extends Vue {

  // -------------------------------------------------------------------------
  // Properties

  private isShowActionMenu: boolean = false;

  // -------------------------------------------------------------------------
  // Computed Properties

  /**
   * It will fetch current session object.
   * @return {SessionModel}
   */
  get session() {
    return sessionService.getSession();
  }

  // -------------------------------------------------------------------------
  // Actions

  private toggleActionMenu() {
    this.isShowActionMenu = !this.isShowActionMenu;
  }

  private doLogout() {
    authAPI.signOut().subscribe(() => {
      this.clearStorageAndDoAuthentication();
    });
  }

  // -------------------------------------------------------------------------
  // Methods

  private clearStorageAndDoAuthentication() {
    authAPI.signInAsAnonymous().subscribe((session) => {
      sessionService.setSession(session);
      this.$router.push('/login');
    });
  }
}
