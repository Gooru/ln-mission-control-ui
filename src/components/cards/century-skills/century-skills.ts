import { Vue, Component } from 'vue-property-decorator';
import GoogleMaterialIcon from '@/components/icons/google-material-icon/google-material-icon';

@Component({
    name: 'century-skills',
    components: {
        'material-icon': GoogleMaterialIcon,
    },
})

export default class CenturySkills extends Vue {

    // --------------------------------------------------------------------------
    // Properties
    private get centurySkill() {
        return this.$store.state.lookupStore.centurySkills;
    }
}
