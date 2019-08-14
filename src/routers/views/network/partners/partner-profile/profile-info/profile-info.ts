import { Component, Vue , Prop } from 'vue-property-decorator';
import ProfileInfoMap from './profile-info-map/profile-info-map';
import axios from 'axios';
import { mapDataSetAPI } from '@/providers/apis/app/map-dataset';
import { statsAPI } from '@/providers/apis/stats/stats';
import { CountryModel } from '@/models/stats/country';

@Component({
  name: 'profile-info',
  components: {
    'profile-info-map': ProfileInfoMap,
  },
})


export default class ProfileInfo extends Vue {

  @Prop()
  private mapData: any;
  @Prop()
  private profileData: any;
}
