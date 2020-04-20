import { appConfigService } from '@/providers/services/app/app-config';
import { PERMISSION_LIST } from '@/utils/constants';

export default {

    ACL: PERMISSION_LIST,

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
    hasPermission(value: any) {
        return this.userRole.pages
            ? (this.userRole.pages.indexOf(value) !== -1)
            : false;
    },

    /**
     * It hold the landing page for the tenant user
     */
    landingPage() {
       return this.userRole.landingPage;
    },
};
