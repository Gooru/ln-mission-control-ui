import { appConfigService } from '@/providers/services/app/app-config';
import { PERMISSION_LIST } from '@/utils/constants';

export default {

    ACL: PERMISSION_LIST,

    /**
     * Help to defined the menu list
     */
    menus: {
        network: 'network',
        competency: 'competency',
        learners: 'learners',
        catalog: 'catalog',
        console: 'console',
    },

    userRole : appConfigService.getAppUserRole(),

    /**
     * Show the menus based on permission
     * @param value
     */
    hasMenuAccess(value: any) {
        return this.userRole.menus.indexOf(value) !== -1;
    },

    /**
     * Show the pages based on permissions
     * @param component
     * @param value
     */
    hasPermission(menu: any , value: any) {

        return this.userRole.pages[menu]
            ? (this.userRole.pages[menu].indexOf(value) !== -1 || this.userRole.pages[menu].indexOf('all') !== -1)
            : false;
    },

    /**
     * It hold the landing page for the tenant user
     */
    landingPage() {
       return this.userRole.landingPage;
    },
};
