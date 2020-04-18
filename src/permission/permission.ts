import { appConfigService } from '@/providers/services/app/app-config';
import { PERMISSION_LIST } from '@/utils/constants';

export default {

    ACL: PERMISSION_LIST,

    /**
     * Show the menus based on permission
     * @param value
     */
    hasMenuAccess(value: any) {
        const userRole: any = appConfigService.getAppUserRole();
        return userRole.menus.indexOf(value) !== -1;
    },

    /**
     * Show the pages based on permissions
     * @param component
     * @param value
     */
    hasPermission(value: any) {
        const userRole: any = appConfigService.getAppUserRole();
        return userRole.pages
            ? (userRole.pages.indexOf(value) !== -1)
            : false;
    },
};
