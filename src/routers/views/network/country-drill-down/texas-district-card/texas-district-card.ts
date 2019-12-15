import { Component, Vue, Prop } from 'vue-property-decorator';
import GoogleMaterialIcon from '@/components/icons/google-material-icon/google-material-icon';


@Component({
    name: 'texas-district-card',
    components: {
        'material-icon': GoogleMaterialIcon,
    },
})

export default class TexasDistrictCard extends Vue {

    // ---------------------------------------------------------------
    // Properties
    @Prop()
    private dataList: any;

    get cardName() {
        const dataList = this.dataList.drilldown ? this.dataList.drilldown : this.dataList;
        const type = dataList[0].type ? dataList[0].type : 'student';
        return type === 'system' ? dataList[0].sub_type : type;
    }

    get cardData() {
        return this.dataList.drilldown ? this.dataList.drilldown : this.dataList;
    }


    // ---------------------------------------------------------------
    // Actions
    private onSelectLevel(seletectLevel: any) {
        this.$emit('onSelectLevel', seletectLevel);
    }
}
