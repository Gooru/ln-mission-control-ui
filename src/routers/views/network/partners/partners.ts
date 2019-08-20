import { Component, Vue, Prop } from 'vue-property-decorator';
import { partnersAPI } from '@/providers/apis/partners/partners';
import { PartnersModel } from '@/models/partners/partners';
import { PartnerModel } from '@/models/partners/partner';
import McIcon from '@/components/icons/mc-icon/mc-icon';
import { numberFormat, numberFormatWithTextSuffix } from '@/helpers/number-format';
import { PARTNERS_TYPE } from '@/utils/constants';
import { OverallStatsModel } from '@/models/partners/overall-stats';
import {sortByProperty} from '@/utils/utils';


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

  /**
   * Set the overall stats from mapData
   */
  @Prop()
  private mapData: any;


  // -------------------------------------------------------------------------
  // Actions

  private onPreviewPartnersType(partnerType: string) {
    const path = `/network/partners/${partnerType}`;
    this.$router.push(path);
  }

  private onPreviewPartnersDetails(parternID: number) {
    this.$router.push({ name: 'network-partners-profile', params: { id: `${parternID}` }});
  }

  // -------------------------------------------------------------------------
  // Hooks

  private created() {
    if (this.mapData) {
      partnersAPI.getPartners().then((response) => {
        this.partners = response;
        this.parsePartnersData();
      });
    }
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
    const overallStats = this.mapData.overallStats;
    return {
      labelKey: partnerType.labelKey,
      pathname: partnerType.pathname,
      total: partners.length,
      totalCount: partnerType.type === 'learners' ? overallStats.totalStudentsCount : overallStats.totalTeachersCount,
      showTop3Partners: partnerType.showTop3Partners,
      partners: this.parsePartners(partnerType.type, partners),
    };
  }

  private parsePartners(type: string, partners: PartnerModel[]) {
     const statsCountries = this.mapData.statsCountries;
     if (type === 'researchers' || type === 'funders') {
      partners.forEach((partner) => {
        const countryData  = partner.countries[0];
        const countryCode = countryData.code;
        const countryStats = statsCountries.find((country: any) => (countryCode === country.country_code));
        if (countryStats) {
          partner.total_users = countryStats.total_users;
          partner.total_teachers = countryStats.total_teachers;
          partner.total_students = countryStats.total_students;
          partner.total_others = countryStats.total_others;
        }
      });
    }
     sortByProperty(partners, 'total_users',  'DESC');
     const top3PartnersData = partners.slice(0, 3);
     return top3PartnersData;
  }

  private numberFormatWithTextSuffix(value: number) {
    return numberFormatWithTextSuffix(value);
  }

  private numberFormat(value: number) {
    return numberFormat(value);
  }
}
