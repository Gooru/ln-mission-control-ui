import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import GoogleMaterialIcon from '@/components/icons/google-material-icon/google-material-icon';

@Component({
    name: 'domain-card',
    components: {
        'material-icon': GoogleMaterialIcon,
    },
})

export default class DomainCard extends Vue {

    // ------------------------------------------------------
    // Properties
    @Prop()
    private domainList: any;

    // ----------------------------------------------------------------------------------
    // Actions
    private onSelectDomain(domain: any) {
        this.domainList.map((domainItem: any) => {
            if (domain.domainCode !== domainItem.domainCode) {
                this.$set(domainItem, 'isExpanded', false);
            }
        });
        const isActive = domain.isExpanded ? false : true;
        this.$set(domain, 'isExpanded', isActive);
        this.$emit('onSelectDomain', isActive ? domain : null);

    }

    private onSelectCompetency(competency: any) {
        this.$emit('onSelectCompetency', competency);
    }

}
