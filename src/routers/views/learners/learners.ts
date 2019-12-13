import { Component, Vue, Watch } from 'vue-property-decorator';
import LearnerFacetsProficiency from '@/components/proficiency/learner-facets-proficiency/learner-facets-proficiency';

@Component({
  components: {
    'learner-facets-proficiency': LearnerFacetsProficiency,
  },
})
export default class Learners extends Vue {

}
