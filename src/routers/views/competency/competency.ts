import { Component, Vue } from 'vue-property-decorator';
import CompetencyMap from './competency-map/competency-map';
import ProficiencyMatrix from './proficiency-matrix/proficiency-matrix';
import {COMPETENCY_NAVIGATION_MENUS} from '@/utils/constants';

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

    private defaultCategoryId: string = '';

    private userId?: any;

    private competencyNavMenu: any = COMPETENCY_NAVIGATION_MENUS;

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

    private onChangeNav(navMenu: any) {
        if (navMenu !== 'competency-map') {
            window.location.href = '/research/competency/' + navMenu;
        }
    }

    private backAction() {
        this.isShowProficiencyView = false;
        this.isShowCompetencyMap = true;
    }
    // -------------------------------------------------------------------------
    // Methods

}
