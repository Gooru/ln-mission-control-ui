import { appConfigService } from '@/providers/services/app/app-config';
import { PERMISSION_LIST, ROLE_MENUS } from '@/utils/constants';

/**
 * Permission class help to show UI based on users permissions
 */
export class Permission {

    private static INSTANCE = new Permission();

    static get instance() {
        return this.INSTANCE;
    }

    public get userRole() {
        return appConfigService.getAppUserRole();
    }

    public ACL = PERMISSION_LIST;

    /**
     * Help to defined the menu list
     */
    public menus = ROLE_MENUS;

    /**
     * Show the menus based on permission
     * @param value
     */
    public hasMenuAccess(value: any) {
        return this.userRole.menus.indexOf(value) !== -1;
    }

    /**
     * Show the pages based on permissions
     * @param component
     * @param value
     */
    public hasPermission(menu: any , value: any) {
        const userRole = this.userRole;
        return userRole.pages[menu]
            ? (userRole.pages[menu].indexOf(value) !== -1 || userRole.pages[menu].indexOf('all') !== -1)
            : false;
    }

    /**
     * It hold the landing page for the tenant user
     */
    public landingPage() {
        return this.userRole.landingPage;
    }
}

export default Permission.instance;
