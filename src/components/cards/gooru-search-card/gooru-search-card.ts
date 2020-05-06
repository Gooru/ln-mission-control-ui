import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import GoogleMaterialIcon from '@/components/icons/google-material-icon/google-material-icon';

@Component({
    name: 'gooru-search-card',
    components: {
        'material-icon': GoogleMaterialIcon,
    },
})

export default class GooruSearchCard extends Vue {

    // -------------------------------------------------------------------------
    // Properties

    private get activityContents() {
        return this.$store.state.comparativeStore.gooruSearch;
    }

    private sortedContents: any = [];
    // -----------------------------------------------------------
    // Methods

    /**
     * @function sortGooruSearch used to sort gooru search result
     */
    public sortGooruSearch(activityContents: any) {
        let activityList = [];
        if (this.sortedContents.length === 0) {
            const selectedResourse = this.mixSelectedActivities(
                activityContents.resource,
            );
            const selectedQuestion = this.mixSelectedActivities(
                activityContents.question,
            );
            const selectedAssessment = this.mixSelectedActivities(
                activityContents.assessment,
            );
            const selectedCollection = this.mixSelectedActivities(
                activityContents.collection,
            );
            const selectedOfflineActivity = this.mixSelectedActivities(
                activityContents.offlineActivity,
            );
            activityList = [
                ...selectedCollection,
                ...selectedAssessment,
                ...selectedOfflineActivity,
                ...selectedResourse,
                ...selectedQuestion,
            ];
            this.sortedContents = this.sortedContents.concat(activityList);
        }
        this.shuffleContainer();
    }


    /**
     * @function mixSelectedActivities used to mix selected activity data
     */
    public mixSelectedActivities(content: any) {
        return content.length ? [content.shift()] : [];
    }

    /**
     * @function mixOtherActivities used to mix other activity data
     */
    public mixOtherActivities(content: any) {
        return content.length > 1
            ? content.splice(0, 2)
            : content.length
                ? [content.shift()]
                : [];
    }

    /**
     * @function shuffle used to suffle acitivity datas
     */
    public shuffleContainer() {
        const activityContents = this.activityContents;

        if (
            activityContents.assessment.length ||
            activityContents.collection.length ||
            activityContents.question.length ||
            activityContents.resource.length
        ) {
            const otherCollection = this.mixOtherActivities(
                activityContents.collection,
            );
            const otherAssessment = this.mixOtherActivities(
                activityContents.assessment,
            );
            const otherQuestion = this.mixOtherActivities(activityContents.question);
            const otherResourse = this.mixOtherActivities(activityContents.resource);
            const otherOfflineActivity = this.mixOtherActivities(
                activityContents.offlineActivity,
            );
            const result = [
                ...otherCollection,
                ...otherAssessment,
                ...otherOfflineActivity,
                ...otherResourse,
                ...otherQuestion,
            ];
            this.sortedContents = this.sortedContents.concat(result);
            this.shuffleContainer();
        }

        return false;
    }

    @Watch('activityContents')
    private onChangeActivity(value: any) {
        if (value.resource) {
            this.sortGooruSearch(value);
        }
    }

    // -------------------------------------------------------------
    // Hooks
    private created() {
        this.sortedContents = [];
    }

}
