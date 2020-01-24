import { Component, Vue } from 'vue-property-decorator';
import CompetencyMap from './competency-map/competency-map';

@Component({
    name: 'competency',
    components: {
        'competency-map': CompetencyMap,
    },
})
export default class Competency extends Vue {

    // -----------------------------------------------------------------------
    // Properties

    private isShowCompetencyMap: boolean = false;

    private isShowProficiencyView: boolean = false;

    // ------------------------------------------------------------------------
    // Hooks

    private created() {
        this.isShowCompetencyMap = true;
    }

    // ------------------------------------------------------------------------
    // Actions

    // -------------------------------------------------------------------------
    // Methods

}
