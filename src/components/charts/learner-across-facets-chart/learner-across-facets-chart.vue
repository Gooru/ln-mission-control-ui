<template>
  <div id="learner-across-facets-chart">
    <div id="facets-chart-view">
    </div>
    <div class="facets-placeholder" :style="{'width': facets.length * facetWidth + 'px'}">
      <span v-for="facet in facets" :style="{'width': facetWidth + 'px'}" class="facet-placeholder">
        {{facet.code}}
      </span>
    </div>


    <div v-if="isShowTooltip" class="facet-tooltip" :style="tooltipPos">
      <span v-for="competency in tooltipInfo.competenciesCount" class="count-info">
        <span :class="['count-label', competency.status]"></span>
        <span>{{competency.count}} Competencies</span>
      </span>
      <span class="subject">{{tooltipInfo.classificationCode + '/'+ tooltipInfo.subjectName}}</span>
    </div>
  </div>
</template>

<script lang="ts" src="./learner-across-facets-chart.ts"></script>
<style lang="scss" src="./learner-across-facets-chart.scss"></style>
