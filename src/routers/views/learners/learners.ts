import { Component, Vue, Watch } from 'vue-property-decorator';
import LearnerList from './learner-list/learner-list';

@Component({
  components: {
    'learner-list': LearnerList,
  },
})
export default class Learners extends Vue {

}
