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

    private hiddenData: boolean = false;

    get cardName() {
        const dataList = this.dataList.drilldown ? this.dataList.drilldown : this.dataList;
        const type = dataList[0].type ? dataList[0].type : 'student';
        return type === 'system' ? dataList[0].subType : type;
    }

    get cardData() {
        const cardData = this.dataList.drilldown ? this.dataList.drilldown : this.dataList;
        return cardData.sort((a: any, b: any) =>
         Math.abs(b.completedCompetencies) - Math.abs(a.completedCompetencies));
    }


    // ---------------------------------------------------------------
    // Actions
    private onSelectLevel(seletectLevel: any) {
        this.$emit('onSelectLevel', seletectLevel);
    }
}
