import { http } from '@/providers/apis/http';
import { lookupSerializer } from '@/providers/serializers/lookup/lookup';


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
        const headers = http.getTokenHeaders();
        return http.get(url, headers).then((response) => {
            return lookupSerializer.normalizeReadAudiences(response.data);
        });
    }

  /**
   * Gets the depth of knowledge list information
   * @returns {Promise.<[]>}
   */
  public readDepthOfKnowledgeItems() {
    const namespace = this.namespace;
    const url = `${namespace}/dok`;
    const headers = http.getTokenHeaders();
    return http.get(url, headers).then((response) =>  {
      return lookupSerializer.normalizeReadDepthOfKnowledgeItems(response.data);
    });
  }

  /**
   * Gets the depth of knowledge list information
   * @returns {Promise.<[]>}
   */
  public readLicenses() {
    const namespace = this.namespace;
    const url = `${namespace}/licenses`;
    const headers = http.getTokenHeaders();
    return http.get(url, headers).then((response) => {
      return lookupSerializer.normalizeReadLicenses(response.data);
    });
  }

  /**
   * Gets the 21st Century Skills list information
   * @returns {Promise.<[]>}
   */
  public readCenturySkills() {
    const namespace = this.namespace;
    const url = `${namespace}/21-century-skills`;
    const headers = http.getTokenHeaders();
    return  http.get(url, headers).then((response) => {
      return lookupSerializer.normalizeCenturySkills(response.data);
    });
  }

}

export const lookupAPI = LookupAPI.instance;
