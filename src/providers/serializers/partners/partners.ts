import { PartnerModel } from '@/models/partners/partner';
import { PartnersModel } from '@/models/partners/partners';


/**
 *
 * This Partners serializer is responsible for converting the Raw format to model.
 *
 */
export class PartnersSerializer {
  private static INSTANCE = new PartnersSerializer();

  static get instance() {
    return this.INSTANCE;
  }

  public partnerModelSerializer(res: any): PartnerModel {
    const result: PartnerModel = {
      partner_id: res.partner_id,
      partner_name: res.partner_name,
      tenant_manager: res.tenant_manager,
      active_users: res.active_users,
    };
    return result;
  }

  public partnersModelSerializer(res: any): PartnersModel {
    const result: PartnersModel = {
      funders: this.partnerListModelSerializer(res.funders),
      integration: this.partnerListModelSerializer(res.integration),
      researchers: this.partnerListModelSerializer(res.researchers),
      content_development: this.partnerListModelSerializer(res.researchers),
      tools_provider: this.partnerListModelSerializer(res.researchers),
      tenant_administrators: this.partnerListModelSerializer(res.researchers),
      implementation: this.partnerListModelSerializer(res.researchers),
    };
    return result;
  }

  public partnerListModelSerializer(res: any): PartnerModel[] {
    const resultSet: PartnerModel[] = new Array();
    res.map((partner: object) => {
      resultSet.push(this.partnerModelSerializer(partner));
    });
    return resultSet;
  }

}

export const partnersSerializer = PartnersSerializer.instance;
