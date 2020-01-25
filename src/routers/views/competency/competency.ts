import { Component, Vue } from 'vue-property-decorator';
import CompetencyMap from './competency-map/competency-map';
import ProficiencyMatrix from './proficiency-matrix/proficiency-matrix';

@Component({
    name: 'competency',
    components: {
        'competency-map': CompetencyMap,
        'proficiency-martix': ProficiencyMatrix,
    },
})
export default class Competency extends Vue {

    // -----------------------------------------------------------------------
    // Properties

    private isShowCompetencyMap: boolean = false;

    private isShowProficiencyView: boolean = false;

    private selectedSubject?: any;

    private userId?: any;

    // ------------------------------------------------------------------------
    // Hooks

    private created() {
        this.isShowCompetencyMap = true;
    }


    // ------------------------------------------------------------------------
    // Actions

    private onSelectSubject(subject: any, userId: any) {
        this.selectedSubject = subject;
        this.userId = userId;
        this.isShowProficiencyView = true;
        this.isShowCompetencyMap = false;
    }
    // -------------------------------------------------------------------------
    // Methods

}
