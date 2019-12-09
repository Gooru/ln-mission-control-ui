import { Component, Vue } from 'vue-property-decorator';
import GoogleMaterialIcon from '@/components/icons/google-material-icon/google-material-icon';

@Component({
    name: 'learners-competency-filter',
    components: {
        'material-icon': GoogleMaterialIcon,
    },
})

export default class LearnersCompetencyFilter extends Vue {

    // --------------------------------------------------------------
    // Properties
    /**
     * @property {boolean} showDropdown helps to maitain dropdown list
     */
    private showDropdown: boolean = false;

    // -----------------------------------------------------------------
    // Actions

}
