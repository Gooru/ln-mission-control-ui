import { Component , Vue   } from 'vue-property-decorator';
import DistributionByContent from './distribution-by-content/distribution-by-content';
import DistributionByCategory from './distribution-by-category/distribution-by-category';

@Component({
    name: 'data-distirbution',
    components: {
        'distribution-by-content': DistributionByContent,
        'distribution-by-category': DistributionByCategory,
    },
})

export default class ProfileDistribution extends Vue {
}
