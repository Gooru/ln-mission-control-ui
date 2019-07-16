import { Component, Vue } from 'vue-property-decorator';
import { partnersAPI } from '@/providers/apis/partners/partners';
import { PartnersModel } from '@/models/partners/partners';
import { PartnerModel } from '@/models/partners/partner';
import McIcon from '@/components/icons/mc-icon/mc-icon';
import { numberFormatWithTextSuffix } from '@/helpers/number-format';
import { PARTNERS_TYPE } from '@/utils/constants';
import { OverallStatsModel } from '@/models/partners/overall-stats';


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
   * Maintains the overall stats of partners
   */
  private overallStats!: OverallStatsModel;

  /**
   * Partition1 partners data.
   */
  private partition1PartnersData: Array<{
    labelKey: string;
    pathname: string;
    total: number;
    totalCount: number;
    partners: PartnerModel[];
  }> = new Array();

  /**
   * Partition2 partners data.
   */
  private partition2PartnersData: Array<{
    labelKey: string;
    total: number;
    totalCount: number;
    partners: PartnerModel[];
  }> = new Array();

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
    });
  }

  // -------------------------------------------------------------------------
  // Methods

  private parsePartnersData() {
    PARTNERS_TYPE.forEach((partnerType) => {
      if (this.partners) {
        const data: PartnerModel[] = this.partners[partnerType.type];
        if (partnerType.partition === 1) {
          this.partition1PartnersData.push(this.createPartner(partnerType, data));
        } else if (partnerType.partition === 2) {
          this.partition2PartnersData.push(this.createPartner(partnerType, data));
        }
        this.overallStats = this.partners.overall_stats;
      }
    });
  }

  private createPartner(partnerType: any, partners: PartnerModel[]) {
    const top3PartnersData = partners.slice(0, 3);
    let totalTeachers = 0;
    let totalStudents = 0;
    partners.forEach((partner) => {
      totalTeachers += partner.total_teachers;
      totalStudents += partner.total_students;
    });
    return {
      labelKey: partnerType.labelKey,
      pathname: partnerType.pathname,
      total: partners.length,
      totalCount: partnerType.type === 'learners' ? totalStudents : totalTeachers,
      showTop3Partners: partnerType.showTop3Partners,
      partners: top3PartnersData,
    };
  }


  private numberFormat(value: number) {
    return numberFormatWithTextSuffix(value);
  }
}
