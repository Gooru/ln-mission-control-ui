import {Vue, Component, Prop} from 'vue-property-decorator';
import GoogleMaterialIcon from '@/components/icons/google-material-icon/google-material-icon';

@Component({
    name: 'comparative-search',
    components: {
        'material-icon': GoogleMaterialIcon,
    },
})

export default class ComparativeSearch extends Vue {

    // -----------------------------------------------------------------
    // Properties
    private searchTerms: string = '';


    // --------------------------------------------------------------------------
    // Actions
    private switchSearch() {
        this.$emit('switchSearch');
    }

    private comparativeSearch() {
        this.$emit('comparativeSearch', {q: this.searchTerms, start: 1});
    }



}
