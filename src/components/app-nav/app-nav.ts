import { Component, Vue } from 'vue-property-decorator';
import { Events } from '@/events';
import { NAVIGATION_MENUS, NAVIGATION_MENUS_INDEX } from '@/utils/constants';
import { getRoutePathFirstOccurrence } from '@/utils/utils';

@Component({ name: 'app-nav' })
export default class AppNav extends Vue {

  // -------------------------------------------------------------------------
  // Properties

  /**
   * Navigation menu items
   * @property {Array}
   */
  get menuItems() {
    return NAVIGATION_MENUS;
  }

  /**
   * Find the active menu index from the navigation list.
   * @property {Boolean}
   */
  get activeMenuIndex() {
    const activeMenuIndex =
      NAVIGATION_MENUS_INDEX[getRoutePathFirstOccurrence()];
    return activeMenuIndex > -1 ? activeMenuIndex : 0;
  }

}
