import { Component , Vue, Prop  } from 'vue-property-decorator';
@Component({
    name: 'content-usage-map-popup',
    components: {
    },
})

export default class ContentUsageMapPopup extends Vue {

   @Prop()
   private profileData: any;

}
