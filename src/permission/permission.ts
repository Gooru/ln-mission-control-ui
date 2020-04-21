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

    /**
     * Show the menus based on permission
     * @param value
     */
    hasMenuAccess(value: any) {
        const userRole = appConfigService.getAppUserRole();
        return userRole.menus.indexOf(value) !== -1;
    },

    /**
     * Show the pages based on permissions
     * @param component
     * @param value
     */
    hasPermission(menu: any , value: any) {
        const userRole = appConfigService.getAppUserRole();
        return userRole.pages[menu]
            ? (userRole.pages[menu].indexOf(value) !== -1 || userRole.pages[menu].indexOf('all') !== -1)
            : false;
    },

    /**
     * It hold the landing page for the tenant user
     */
    landingPage() {
        const userRole = appConfigService.getAppUserRole();
        return userRole.landingPage;
    },
};
