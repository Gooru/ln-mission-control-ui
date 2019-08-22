import { Component, Vue, Prop } from 'vue-property-decorator';
import ProfileInfoMap from './profile-info-map/profile-info-map';
import axios from 'axios';
import { mapDataSetAPI } from '@/providers/apis/app/map-dataset';
import { statsAPI } from '@/providers/apis/stats/stats';
import { CountryModel } from '@/models/stats/country';
import { PARTNERS_TYPE } from '@/utils/constants';
import ProfileGallery from './profile-gallery/profile-gallery';
import { PartnerModel } from '@/models/partners/partner';

@Component({
  name: 'profile-info',
  components: {
    'profile-info-map': ProfileInfoMap,
    'profile-gallery': ProfileGallery,
  },
})


export default class ProfileInfo extends Vue {

  // ---------------------------------------------------
  // Properties

  /**
   * Maintains the data of map values
   */

  @Prop()
  private mapData: any;

  /**
   * Maintains the data of partner profile
   */

  @Prop()
  private partnerProfile: any;

  /**
   * Maintains the gallery data that are showen in front end
   */

  private galleryData: string = '';

  // ---------------------------------------------------
  // Hooks

  private created() {
    this.initialize();
  }

  // ---------------------------------------------------
  // Methods

  private initialize() {
    const partnerTypeData = PARTNERS_TYPE.find((type) => (type.type === this.partnerProfile.partner_type));
    if (partnerTypeData) {
      this.partnerProfile.labelKey = partnerTypeData.labelKey;
    }
  }

  /**
   * Passing gallery heading to the popup
   */
  private galleryImage(value: string) {
    this.galleryData = value;
  }

}
