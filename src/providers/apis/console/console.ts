import { http } from '@/providers/apis/http';

export class ConsoleAPI {
    static get instance() {
        return this.INSTANCE;
    }
    private static INSTANCE = new ConsoleAPI();
    private namespace = '/api/v1/xapi/statements';

    public postStatementData(payload: any, params = null) {
        const endpoint = this.namespace;
        const headers = http.getTokenHeaders();
        return http.get(endpoint, headers, payload).then((response) => {
           return response;
        });
    }
}

export const consoleAPI = ConsoleAPI.instance;
