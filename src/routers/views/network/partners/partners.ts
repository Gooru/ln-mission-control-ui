import { Component, Vue } from 'vue-property-decorator';
import { partnersAPI } from '@/providers/apis/partners/partners';
import { PartnersModel } from '@/models/partners/partners';
import { PartnerModel } from '@/models/partners/partner';
import McIcon from '@/components/icons/mc-icon/mc-icon';
import { numberFormatWithTextSuffix } from '@/helpers/number-format';

@Component({
  name: 'partners',
  components: {
    'mc-icon': McIcon,
  },
})
export default class Partners extends Vue {
  // -------------------------------------------------------------------------
  // Properties

  /**
   * Maintains the list of partners
   */
  private partners: PartnersModel | null = null;

  /**
   * Partition1 partners data.
   */
  private partition1PartnersData: Array<{
    key: string;
    total: number;
    partners: PartnerModel[];
  }> = new Array();

  /**
   * Partition2 partners data.
   */
  private partition2PartnersData: Array<{
    key: string;
    total: number;
    partners: PartnerModel[];
  }> = new Array();

  // -------------------------------------------------------------------------
  // Hooks

  private mounted() {
    partnersAPI.getPartners().then((response) => {
      this.partners = response;
      this.parsePartnersData();
    });
  }

  // -------------------------------------------------------------------------
  // Methods

  private parsePartnersData() {
    if (this.partners) {
      this.partition1PartnersData.push(this.createPartner('tool.providers', this.partners.tools_providers));
      this.partition1PartnersData.push(this.createPartner('researcher.partners', this.partners.researchers));
      this.partition1PartnersData.push(this.createPartner('content.developers', this.partners.content_developers));
      this.partition1PartnersData.push(this.createPartner('administrators', this.partners.administrators));

      this.partition2PartnersData.push(this.createPartner('integration.partners', this.partners.integration_partners));
      this.partition2PartnersData.push(this.createPartner('instructors', this.partners.implementation_partners));
      this.partition2PartnersData.push(this.createPartner('learners', this.partners.learners));
      this.partition2PartnersData.push(this.createPartner('funders', this.partners.funders));
    }

  }

  private createPartner(partnerCategory: string, partners: PartnerModel[]) {
    const top3PartnersData = partners.slice(0, 3);
    return {
      key: partnerCategory,
      total: partners.length,
      partners: top3PartnersData,
    };
  }

  private numberFormat(value: number) {
    return numberFormatWithTextSuffix(value);
  }
}
