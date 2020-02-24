import { Component, Vue, Prop } from 'vue-property-decorator';
import GoogleMaterialIcon from '@/components/icons/google-material-icon/google-material-icon';
import { CompetencyModel } from '@/models/drill-down/competency';


@Component({
    name: 'level-card',
    components: {
        'material-icon': GoogleMaterialIcon,
    },
})

export default class LevelCard extends Vue {

    // ---------------------------------------------------------------
    // Properties
    @Prop()
    private dataList?: CompetencyModel;
    @Prop()
    private studentList: any;

    private hiddenData: boolean = false;

    get cardName() {
        const dataList = this.dataList ? this.dataList.drilldown : this.studentList;
        const type = dataList[0].type ? dataList[0].type : 'student';
        return type === 'system' ? dataList[0].subType : type;
    }

    get cardData() {
        let cardData = this.dataList ? this.dataList.drilldown : this.studentList;
        cardData = cardData.sort((a: any, b: any) => {
            if (a.name < b.name) { return -1; }
            if (a.name > b.name) { return 1; }
            if (a.fullName < b.fullName) { return -1; }
            if (a.fullName > b.fullName) { return 1; }
            return 0;
        });
        return cardData.sort((a: any, b: any) => Math.abs(b.completedCompetencies) - Math.abs(a.completedCompetencies));
    }


    // ---------------------------------------------------------------
    // Actions
    private onSelectLevel(seletectLevel: any) {
        if (this.cardName === 'student') {
            this.$router.push(`/learners/${seletectLevel.userId}`);
        } else {
            this.$emit('onSelectLevel', seletectLevel);
        }
    }
}
