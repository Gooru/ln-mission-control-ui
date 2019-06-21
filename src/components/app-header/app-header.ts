import { Component, Vue } from 'vue-property-decorator';
import { sessionService } from '@/providers/services/auth/session';
import { Events } from '@/events';
import AppNav from '@/components/app-nav/app-nav.vue';

@Component({
  name: 'app-header',
  components: {
    AppNav,
  },
})
export default class AppHeader extends Vue {
  // -------------------------------------------------------------------------
  // Properties

  /**
   * It will fetch current session object.
   * @return {SessionModel}
   */
  get session() {
    return sessionService.getSession();
  }
}
