<template>
  <div id="learner-across-facets-chart">
    <div id="facets-chart-view">
    </div>

    <div v-if="isShowTooltip" class="facet-tooltiop" :style="tooltipPos">
      {{tooltipText}}
    </div>
  </div>
</template>

<script lang="ts" src="./learner-across-facets-chart.ts"></script>
<style lang="scss" src="./learner-across-facets-chart.scss"></style>
