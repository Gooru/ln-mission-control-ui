import { Vue, Component, Watch } from 'vue-property-decorator';
import GoogleMaterialIcon from '@/components/icons/google-material-icon/google-material-icon';
import { demoUser } from '@/providers/apis/demo-user/demo-user';
import { sessionService } from '@/providers/services/auth/session';

@Component({
  name: 'role-list',
  components: {
    'material-icon': GoogleMaterialIcon,
  },
})

export default class RoleList extends Vue {

  // -------------------------------------------------------------------------
  // Properties

  /**
   * Holding all the user roles data
   */
  private roleList: any = [{
    name: 'Super User',
    code: 'DEMO_USER',
  }];

  /**
   * Help to handle show current user option in menus
   */
  private get showCurrentUser() {
    return sessionService.getActive() ? sessionService.getActive().code : 'DEMO_USER';
  }

  // -------------------------------------------------------------------------
  // Hooks

  private created() {
    demoUser.fetchDemoAccounts().then((roles) => {
      this.roleList = [...this.roleList, ...roles];
    });
  }

  // ---------------------------------------------------------------------------------
  // Actions

  /**
   *
   * @param role it has selected role details
   */
  private onChangeRole(role: any) {
    sessionService.setActive({code: role.code});
    if (role.code !== 'DEMO_USER') {
      this.$access.doLoginInWithCredential(role);
      return;
    }
    const session = sessionService.getDemoSessionCopy();
    if (session) {
      this.$access.updateRole(session);
    }
  }
}
