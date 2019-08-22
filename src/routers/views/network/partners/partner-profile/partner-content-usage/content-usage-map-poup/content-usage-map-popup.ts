import { Component, Vue, Prop } from 'vue-property-decorator';
import { numberFormatWithTextSuffix } from '@/helpers/number-format';
import { CONTENT_TYPE } from '@/utils/constants';
@Component({
    name: 'content-usage-map-popup',
    components: {
    },
})

export default class ContentUsageMapPopup extends Vue {

    // ---------------------------------------------------------
    // Properties

    // Getting available country
    private filerByCountry: any = null;

    // Maintain active country data
    @Prop()
    private activeCountry: any;

    // Maintain partner profile data
    @Prop()
    private profileData: any;

    // Maintains content type data constant
    private contentTypeData: any = CONTENT_TYPE;

    // -----------------------------------------------------------
    // Hookes

    private created() {
        const country_code = this.activeCountry.country_code;
        this.filerByCountry = this.profileData.content_type_stats.filter((x: any) => {
            return x.country_code === country_code;
        });
    }

    // -------------------------------------------------------------
    // Methods

    private numberFormatWithTextSuffix(value: number) {
        return numberFormatWithTextSuffix(value);
    }

    // Find content type total count by its type
    private contentFindByType(value: any) {
        return this.filerByCountry.find((x: any) =>
            x.content_type === value) ? this.filerByCountry.find((x: any) =>
                x.content_type === value).total_count : 0;
    }

}
