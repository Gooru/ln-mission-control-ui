import { http } from '@/providers/apis/http';

export class XAPI {
    static get instance() {
        return this.INSTANCE;
    }
    private static INSTANCE = new XAPI();
    private namespace = 'api/v1/xapi/statements';

    public postStatementData(payload: any) {
        const endpoint = this.namespace;
        const headers = http.getTokenHeaders();
        return http.post(endpoint, headers, JSON.parse(payload)).then((response) => {
           return response;
        });
    }

    public queryStatements(params: any) {
      const endpoint = this.namespace;
      const headers = http.getTokenHeaders();
      return http.get(endpoint, headers, params).then((response) => {
         return response.data;
      });
    }
}

export const xAPI = XAPI.instance;
