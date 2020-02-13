import { Vue, Component, Prop } from 'vue-property-decorator';
import CollectionCard from '../collection-card/collection-card';
import GoogleMaterialIcon from '@/components/icons/google-material-icon/google-material-icon';

@Component({
    name: 'learning-map-content',
    components: {
        'collection-card': CollectionCard,
        'material-icon': GoogleMaterialIcon,
    },
})

export default class LearningMapContent extends Vue {
    // -----------------------------------------------------------------------------
    // Properties
    @Prop()
    private learningMapContent: any;

    @Prop()
    private selectedContent: any;

    get selectedContentList() {
        return this.learningMapContent.contents ?
            this.learningMapContent.contents[this.selectedContent] : [];
    }

    // -------------------------------------------------------------------------------
    // Actions

    private onClose() {
        this.$emit('onClose');
    }
}
