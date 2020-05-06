import { Vue, Component, Watch} from 'vue-property-decorator';
import GoogleMaterialIcon from '@/components/icons/google-material-icon/google-material-icon';
import { ResearchModel } from '@/models/research/research';
import { sortByProperty } from '@/utils/utils';

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

    private sortOptions: any = [];

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

    private sortTable(itemName: any) {
        this.sortOptions = this.sortOptions.indexOf(itemName) !== -1
                ? this.sortOptions.filter((items: any) => items !== itemName)
                : this.sortOptions.concat([itemName]);
        const sortOrder = this.sortOptions.indexOf(itemName) !== -1 ? 'ASC' : 'DESC';
        if (itemName === 'teams') {
            this.contentList = this.contentList.sort((a: any, b: any) => {
                if (a.teams === b.teams) {
                    return 0;
                } else if (a.teams === null) {
                    return 1;
                } else if (b.teams === null) {
                    return -1;
                } else {
                    return a.teams[0] < b.teams[0] ? 1 : -1;
                }
        });
            if (sortOrder === 'DESC') {
             this.contentList = this.contentList.reverse();
        }
            return;
      }
        sortByProperty(this.contentList, itemName, sortOrder);
    }

}
