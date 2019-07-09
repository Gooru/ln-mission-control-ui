import { Component, Vue } from 'vue-property-decorator';
import { partnersAPI } from '@/providers/apis/partners/partners';
import { PartnersModel } from '@/models/partners/partners';
import { PartnerModel } from '@/models/partners/partner';
import McIcon from '@/components/icons/mc-icon/mc-icon';
import { numberFormatWithTextSuffix } from '@/helpers/number-format';
import { PARTNERS_TYPE } from '@/utils/constants';


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
    labelKey: string;
    pathname: string;
    total: number;
    partners: PartnerModel[];
  }> = new Array();

  /**
   * Partition2 partners data.
   */
  private partition2PartnersData: Array<{
    labelKey: string;
    total: number;
    partners: PartnerModel[];
  }> = new Array();

  /**
   * Maintains the value of partners metrics data
   */
  private partnerMetrics: {
    total: number,
    total_users: number,
    total_countries: number,
  } = { total: 0, total_users: 0, total_countries: 0 };

  // -------------------------------------------------------------------------
  // Actions

  private onPreviewPartnersType(partnerType: string) {
    const path = `/network/partners/${partnerType}`;
    this.$router.push(path);
  }

  // -------------------------------------------------------------------------
  // Hooks

  private mounted() {
    partnersAPI.getPartners().then((response) => {
      this.partners = response;
      this.parsePartnersData();
      this.computePartnerMetricsData();
    });
  }

  // -------------------------------------------------------------------------
  // Methods

  private parsePartnersData() {
    PARTNERS_TYPE.forEach((partnerType) => {
      if (this.partners) {
        const data: PartnerModel[] = this.partners[partnerType.type];
        if (partnerType.partition === 1) {
          this.partition1PartnersData.push(this.createPartner(partnerType.labelKey, partnerType.pathname, data));
        } else if (partnerType.partition === 2) {
          this.partition2PartnersData.push(this.createPartner(partnerType.labelKey, partnerType.pathname, data));
        }
      }
    });
  }

  private createPartner(labelKey: string, pathname: string, partners: PartnerModel[]) {
    const top3PartnersData = partners.slice(0, 3);
    return {
      labelKey,
      pathname,
      total: partners.length,
      partners: top3PartnersData,
    };
  }

  private computePartnerMetricsData() {
    if (this.partners) {
      const partners = this.partners;
      Object.entries(partners).forEach(
        ([key, data]) => {
          this.partnerMetrics.total += data.length;
          data.map((partner: PartnerModel) => {
            this.partnerMetrics.total_countries += partner.countries.length;
            this.partnerMetrics.total_users += partner.total_users;
          });
        });
    }
  }

  private numberFormat(value: number) {
    return numberFormatWithTextSuffix(value);
  }
}
