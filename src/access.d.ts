import Vue from 'vue';

declare module 'vue/types/vue' {
  interface Vue {
    $access: any;
  }
  interface VueConstructor {
    $access: any;
  }
}

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    access?: any;
  }
}
