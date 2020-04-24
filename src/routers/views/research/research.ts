import { Vue, Component, Watch} from 'vue-property-decorator';
import GoogleMaterialIcon from '@/components/icons/google-material-icon/google-material-icon';
import { ResearchModel } from '@/models/research/research';

@Component({
    name: 'research',
    components: {
        'material-icon': GoogleMaterialIcon,
    },
})

export default class Research extends Vue {

    // ------------------------------------------------------
    // Properties

    private contentList: ResearchModel[] = [];

    private isTeamList: boolean = false;

    private activeIndex: number = -1;

    /**
     * Hold the list of research projects
     */
    private get researchProjects() {
        return this.$store.state.researchStore.researchProjects;
    }

    @Watch('researchProjects')
    private onChangeList(value: ResearchModel[]) {
        this.contentList = value;
    }

    /**
     * Hold the list list of Categories
     */
    private get researchCategories() {
        return this.$store.state.researchStore.researchCategories;
    }

    /**
     * Hold the list of teams
     */
    private get reasearchTeams() {
        return this.$store.state.researchStore.reasearchTeams;
    }



    // ------------------------------------------------------------------------------
    // Hooks

    private created() {
        this.$store.dispatch('researchStore/fetchResearchProjects');
    }

    // -------------------------------------------------------------------------------------
    // Actions

    /**
     * Action trigger when click on category from research category
     * @param name
     */
    private onSelectCategory(name: string) {
        this.isTeamList = false;
        this.activeIndex = this.researchCategories.indexOf(name);
        this.contentList =  name === 'all' ? this.researchProjects : this.categoriesTypes(name);
    }

    /**
     * Action trigger when click on team from research teams
     * @param name
     */
    private onSelectTeam(name: string) {
        this.isTeamList = true;
        this.activeIndex = this.reasearchTeams.indexOf(name);
        this.contentList =  name === 'all' ? this.researchProjects : this.teamsTypes(name);
    }

    // --------------------------------------------------------------------------------------
    // Methods

    /**
     * Method help to get categories count based on category name
     * @param name
     */
    private categoriesTypes(name: string) {
        return this.researchProjects.filter(
            (item: ResearchModel) => item.category === name) || [];
    }

    /**
     * Method help to get teams count based on team name
     * @param name
     */
    private teamsTypes(name: string) {
        return this.researchProjects.filter(
            (item: ResearchModel) => item.teams && item.teams.includes(name)) || [];
    }

}
