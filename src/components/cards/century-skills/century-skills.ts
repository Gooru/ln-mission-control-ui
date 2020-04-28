import { Vue, Component, Prop } from 'vue-property-decorator';
import GoogleMaterialIcon from '@/components/icons/google-material-icon/google-material-icon';
import { CENTURY_SKILLS_GROUPS } from '@/utils/constants';

@Component({
    name: 'century-skills',
    components: {
        'material-icon': GoogleMaterialIcon,
    },
})

export default class CenturySkills extends Vue {

    // --------------------------------------------------------------------------
    // Properties
    @Prop()
    private showCentury: any;

    private selectedCenturyList: any = [];

    private get centurySkill() {
        return this.$store.state.lookupStore.centurySkills;
    }

    private groupList: any = CENTURY_SKILLS_GROUPS;

    // -----------------------------------------------------------------------------
    // Actions
    private onSelectCenturySkills(content: any) {
        if (this.isActiveGroup(content)) {
            this.selectedCenturyList = this.selectedCenturyList.filter((items: any) => items.id !== content.id);
        } else {
            this.selectedCenturyList.push(content);
        }

    }

    private onClose() {
        this.$set(this.showCentury, 'isActive', false);
    }

    private onSubmit() {
        this.$emit('onSubmit', this.selectedCenturyList, this.showCentury);
        this.$set(this.showCentury, 'isActive', false);
    }

    // -----------------------------------------------------------------------------
    // Methods

    private getGroupContent(keyName: string) {
        return this.centurySkill.filter(
            (item: any) => item.group === keyName);
    }

    private isActiveGroup(content: any) {
        return this.selectedCenturyList.find((item: any) => item.id === content.id);
    }
}
