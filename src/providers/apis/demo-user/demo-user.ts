import { Vue } from 'vue-property-decorator';
import {http} from '@/providers/apis/http';

/**
 * Class help to fetch demo user roles
 */
export class DemoUser extends Vue {

    private static INSTANCE = new DemoUser();

    static get instance() {
        return this.INSTANCE;
    }

    private namespace: string = 'stubs';

    /**
     * Help to fetch roles list from the json
     */
    public fetchDemoAccounts() {
        const endpoints = `${window.location.origin}/${this.namespace}/demo-accounts.json`;
        const headers = http.getTokenHeaders();

        return http.get(endpoints, headers).then((response) => {
            return response.data;
        });

    }

}

export const demoUser = DemoUser.instance;
