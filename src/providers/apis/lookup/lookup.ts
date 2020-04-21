import { http } from '@/providers/apis/http';


export class LookupAPI {

    private static INSTANCE = new LookupAPI();

    static get instance() {
        return this.INSTANCE;
    }

    private namespace: string = 'api/nucleus/v1/lookups';


    /**
     * Gets the audience list information
     * @returns {Promise.<[]>}
     */
    public readAudiences() {
        const namespace = this.namespace;
        const url = `${namespace}/audience`;
        const options = {
            type: 'GET',
            headers: http.getTokenHeaders(),
        };
        return http.get(url, options).then((response) => {
            return response.data;
        });
    }

  /**
   * Gets the depth of knowledge list information
   * @returns {Promise.<[]>}
   */
  public readDepthOfKnowledgeItems() {
    const namespace = this.namespace;
    const url = `${namespace}/dok`;
    const options = {
      type: 'GET',
      headers: http.getTokenHeaders(),
    };
    return http.get(url, options).then((response) =>  {
      return response.data;
    });
  }

}

export const lookup = LookupAPI.instance;
