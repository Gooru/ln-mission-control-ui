import { Component, Vue } from 'vue-property-decorator';
import { sessionService } from '@/providers/services/auth/session';
import { Events } from '@/events';
import AppHeaderNav from '@/layouts/app-header-layout/app-header-nav/app-header-nav.vue';
import { authAPI } from '@/providers/apis/auth/auth';
import { NAVIGATION_MENUS } from '@/utils/constants';
import RoleList from '@/components/cards/role-list/role-list';

@Component({
  components: {
    AppHeaderNav,
    RoleList,
  },
})
export default class AppHeaderLayout extends Vue {

  // -------------------------------------------------------------------------
  // Properties

  private currentRouteName: string = 'network';

  /**
   * @returns {boolean} isDemoUser help to show the user role list
   */
  private isDemoUser: boolean = false;

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
    authAPI.signOut().then(() => {
      sessionService.deleteSession();
      this.$router.push('/login');
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
