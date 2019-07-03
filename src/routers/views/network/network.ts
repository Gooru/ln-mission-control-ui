import { Component, Vue } from 'vue-property-decorator';
import NavLearningWorldWide from './nav-learning-worldwide/nav-learning-worldwide';
import Partners from './partners/partners';

@Component({
  components: {
    'nav-learning-worldwide': NavLearningWorldWide,
    'partners': Partners,
  },
})
export default class Network extends Vue { }
