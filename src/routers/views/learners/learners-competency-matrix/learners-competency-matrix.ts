import {Component, Vue} from 'vue-property-decorator';
import GussieCharts from '@/components/charts/gussie-chart/gussie-chart';
import LearnersCompetencyFilter from './learners-competency-filter/learners-competency-filter';

@Component({
    name: 'learners-matrix',
    components: {
        'gussie-charts': GussieCharts,
        'competency-matrix-filter': LearnersCompetencyFilter,
    },
})

export default class LearnersMatrix extends Vue {

}
