import { appConfigService } from '@/providers/services/app/app-config';
import { PERMISSION_LIST, ROLE_MENUS } from '@/utils/constants';
import { authAPI } from '@/providers/apis/auth/auth';
import { sessionService } from '@/providers/services/auth/session';
import { appConfigAPI } from '@/providers/apis/app/app-config';
import router from '@/routers/router';
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
    public hasPermission(menu: any, value: any) {
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

    /**
     * help to login as a demo user
     * @param userDetails holding user login credentials
     */
    public doLoginInWithCredential(userDetails: any) {
        const username = userDetails.username;
        const password = atob(userDetails.password);
        authAPI
            .logInWithCredential(username, password)
            .then(
                (session) => {
                    this.updateRole(session);
                },
            );
    }


    public updateRole(session: any) {
        if (!sessionService.getDemoSessionCopy()) {
            sessionService.setDemoSessionCopy();
        }
        appConfigAPI.getAppPermissions(session.permissions).then((userRole: any) => {
            if (userRole) {
                appConfigService.setAppUserRole(userRole);
                sessionService.setSession(session);
                router.push(userRole.landingPage);
                // Remove once the ember js not used on mission control
                if (sessionService.getMcUpdate()) {
                    sessionService.deleteMcUpdate();
                } else {
                    window.location.reload(true);
                }
            }
        });
    }
}

export default Permission.instance;
