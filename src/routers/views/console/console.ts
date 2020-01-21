import { Component, Vue } from 'vue-property-decorator';
import { sessionService } from '@/providers/services/auth/session';

@Component
export default class Console extends Vue {

    private get session() {
        return sessionService.getSession();
    }
}
