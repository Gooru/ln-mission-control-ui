import { Component, Vue } from 'vue-property-decorator';
import { sessionService } from '@/providers/services/auth/session';
import { Events } from '@/events';
import AppHeaderNav from '@/layouts/app-header-layout/app-header-nav/app-header-nav.vue';
import { authAPI } from '@/providers/apis/auth/auth';
import { NAVIGATION_MENUS } from '@/utils/constants';

@Component({
  components: {
    AppHeaderNav,
  },
})
export default class AppHeaderLayout extends Vue {

  // -------------------------------------------------------------------------
  // Properties

  private currentRouteName: string = 'network';


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


  private doLogout() {
    authAPI.signOut().subscribe(() => {
      this.clearStorageAndDoAuthentication();
    });
  }

  private closeAppNav() {
    (this.$refs.appSideNav as HTMLFormElement).style.width = '0px';
  }

  private openAppNav() {
    (this.$refs.appSideNav as HTMLFormElement).style.width = '300px';
  }

  private onChangeRoute(currentRoutePath: string) {
    (this.$refs.appSideNav as HTMLFormElement).style.width = '0px';
    this.setCurrentRouteName(currentRoutePath);
  }

  // -------------------------------------------------------------------------
  // Hooks

  private mounted() {
    const currentRoutePath = this.$router.currentRoute.path;
    this.setCurrentRouteName(currentRoutePath);

  }

  // -------------------------------------------------------------------------
  // Methods

  private clearStorageAndDoAuthentication() {
    authAPI.signInAsAnonymous().subscribe((session) => {
      sessionService.setSession(session);
      this.$router.push('/login');
    });
  }

  private setCurrentRouteName(currentRoutePath: string) {
    const selectedMenuItems = NAVIGATION_MENUS.filter((menuItem, index) => {
      return menuItem.path === currentRoutePath ? menuItem : null;
    });
    const selectedMenuItem = selectedMenuItems[0];
    if (selectedMenuItem) {
      this.currentRouteName = selectedMenuItem.name;
    }
  }
}
