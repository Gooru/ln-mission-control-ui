import { Component, Vue } from 'vue-property-decorator';
import NavLearningWorldWide from '@/routers/views/network/nav-learning-worldwide/nav-learning-worldwide.vue';

@Component({
  components: {
    'nav-learning-worldwide': NavLearningWorldWide,
  },
})
export default class Network extends Vue {}
