import { Component, Vue } from 'vue-property-decorator';
import CatalogSearch from './catalog-search/catalog-search';

@Component({
    name: 'catalog',
    components: {
        'catalog-search': CatalogSearch,
    },
})
export default class Catalog extends Vue {}
