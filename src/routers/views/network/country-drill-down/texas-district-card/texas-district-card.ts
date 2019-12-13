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
        const dataList = this.dataList;
        return dataList.length ? dataList[0].type : 'states';
    }

    // ---------------------------------------------------------------
    // Actions
    private onSelectLevel(seletectLevel: any) {
        this.$emit('onSelectLevel', seletectLevel);
    }
}
