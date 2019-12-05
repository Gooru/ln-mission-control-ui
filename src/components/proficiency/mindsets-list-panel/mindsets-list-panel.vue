<template>
  <div id="mindsets-list-panel">
    <div class="mindset-info" v-for="learnerVector in learnerVectors">
      <progress-bar :label="learnerVector.label" :fillValue="learnerVector.value" />
    </div>
  </div>
</template>

<script lang="ts" src="./mindsets-list-panel.ts"> </script>
<style lang="scss" src="./mindsets-list-panel.scss"></style>
