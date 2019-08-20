import { Component, Vue, Prop } from 'vue-property-decorator';
import { numberFormatWithTextSuffix } from '@/helpers/number-format';
@Component({
    name: 'content-usage-map-popup',
    components: {
    },
})

export default class ContentUsageMapPopup extends Vue {

    @Prop()
    private country: any;
    @Prop()
    private profileData: any;

    private filerByCountry: any = null;

    private created() {
        const country_code = this.country.country_code;
        this.filerByCountry = this.profileData.content_type_stats.filter((x: any) => {
            return x.country_code === country_code;
        });
    }
    private numberFormatWithTextSuffix(value: number) {
        return numberFormatWithTextSuffix(value);
      }

}
