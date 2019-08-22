import { http } from '@/providers/apis/http';
import { PartnersModel } from '@/models/partners/partners';
import { PartnerModel } from '@/models/partners/partner';
import { partnersSerializer } from '@/providers/serializers/partners/partners';
/**
 *
 * This Partners API Provider is responsible for all partners related API's.
 *
 */
export class PartnersAPI {

  private static INSTANCE = new PartnersAPI();

  static get instance() {
    return this.INSTANCE;
  }

  private partnersNamespace: string = 'api/missioncontrol/v1';

  public getPartners(): Promise<PartnersModel> {
    const endpoint = `${this.partnersNamespace}/partners`;
    const headers = http.getTokenHeaders();
    return http.get(endpoint, headers).then((response) => {
      return partnersSerializer.partnersModelSerializer(response.data);
    });
  }

  public getPartnersByType(type: string): Promise<PartnerModel[]> {
    const endpoint = `${this.partnersNamespace}/partners`;
    const headers = http.getTokenHeaders();
    const params = { type };
    return http.get(endpoint, headers, params).then((response) => {
      return partnersSerializer.partnerListModelSerializer(response.data[type]);
    });
  }

  public getPartnerById(id: string): Promise<PartnerModel> {
    const endpoint = `${this.partnersNamespace}/partners/${id}`;
    const headers = http.getTokenHeaders();
    return http.get(endpoint, headers).then( (res) => {
      return partnersSerializer.partnerModelSerializer(res.data);
    });
  }

}

export const partnersAPI = PartnersAPI.instance;
