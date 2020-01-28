import { Vue, Component, Prop } from 'vue-property-decorator';
import GoogleMaterialIcon from '@/components/icons/google-material-icon/google-material-icon';

@Component({
    name: 'competency-card',
    components: {
        'material-icon': GoogleMaterialIcon,
    },
})

export default class CompetencyCard extends Vue {

    // ----------------------------------------------------------------------
    // Properties
    @Prop()
    private activeCompetency: any;

}
