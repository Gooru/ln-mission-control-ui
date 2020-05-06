import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import GoogleMaterialIcon from '@/components/icons/google-material-icon/google-material-icon';
import ComparativeSearchCard from '@/components/cards/comparative-search-card/comparative-search-card';
import GooruSearchCard from '@/components/cards/gooru-search-card/gooru-search-card';

@Component({
    name: 'comparative-content',
    components: {
        'material-icon': GoogleMaterialIcon,
        'comparative-search-card': ComparativeSearchCard,
        'gooru-search-card': GooruSearchCard,
    },
})

export default class ComparativeContent extends Vue {

    // ----------------------------------------------------------------------------
    // Properties
    @Prop()
    private filterParams: any;

    @Watch('filterParams', {deep: true})
    private onChangeFilter(value: any) {
        this.onLoadContent(value);
    }

    // private get googleSearch() {
    //     return this.$store.state.comparativeStore.googleSearch;
    // }

    // private get bingSearch() {
    //     return this.$store.state.comparativeStore.bingSearch;
    // }


    // ------------------------------------------------------------------------------
    // Methods
    private onLoadContent(params: any) {
        // this.$store.dispatch('comparativeStore/otherSearch', params);
        params.length = 10;
        this.$store.dispatch('comparativeStore/comparativeSearch', params);

    }
}
