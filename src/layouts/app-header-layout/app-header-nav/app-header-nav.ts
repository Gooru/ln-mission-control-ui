import { Component, Vue } from 'vue-property-decorator';
import { Events } from '@/events';
import { NAVIGATION_MENUS } from '@/utils/constants';


@Component({ name: 'app-header-nav' })
export default class AppHeaderNav extends Vue {

  // -------------------------------------------------------------------------
  //  Properties

  private currentRoutePath: string = '/network';


  private submenuStyle: any = {};

  // -------------------------------------------------------------------------
  // Computed Properties

  /**
   * Navigation menu items
   * @property {Array}
   */
  get menuItems() {
    return NAVIGATION_MENUS;
  }

  // -------------------------------------------------------------------------
  //  Hooks

  public mounted() {
    this.currentRoutePath = this.$router.currentRoute.path;
  }

  // -------------------------------------------------------------------------
  //  Actions

  private onChangeRoute(currentPath: string) {
    this.currentRoutePath = currentPath;
    this.$router.push(currentPath);
    this.$emit('send', currentPath);

  }
}
