import { Component, Vue , Prop } from 'vue-property-decorator';
import ProfileInfoMap from './profile-info-map/profile-info-map';
import axios from 'axios';
import { mapDataSetAPI } from '@/providers/apis/app/map-dataset';
import { statsAPI } from '@/providers/apis/stats/stats';
import { CountryModel } from '@/models/stats/country';
import { PARTNERS_TYPE } from '@/utils/constants';
import ProfileGallery from './profile-gallery/profile-gallery';

@Component({
  name: 'profile-info',
  components: {
    'profile-info-map': ProfileInfoMap,
    'profile-gallery': ProfileGallery,
  },
})


export default class ProfileInfo extends Vue {

  @Prop()
  private mapData: any;
  @Prop()
  private profileData: any;

  private galleryPopUp: boolean = false;
  private galleryData: string = '';

  private created() {
    this.initialize();
  }

  private initialize() {
    const partnerTypeData = PARTNERS_TYPE.find((type) => (type.type === this.profileData.partner_type));
    if (partnerTypeData) {
      this.profileData.labelKey = partnerTypeData.labelKey;
    }
  }

  private galleryImage(value: string) {
    this.galleryData = value;
    this.galleryPopUp = true;
  }
  private galleryPop(value: boolean) {
    this.galleryPopUp = value;
  }
}
