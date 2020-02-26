<template>
  <div id="facets-list-panel">
    <div
      class="facet-competency"
      v-for="(facetCompetencyMatrix, index) in facetsCompetencyMatrix"
      v-bind:key="index"
    >
      <div class="facet-header">
        <div class="facet-seq">{{index + 1}}.</div>
        <div class="facet-info">
          <span class="facet-title">{{facetCompetencyMatrix.subjectName}}</span>
          <span
            class="total-competencies"
          >{{facetCompetencyMatrix.totalCompetenciesCount}} Competencies</span>
        </div>
        <div class="toggle" @click="isShowCompetencyDetails = !isShowCompetencyDetails">
          <google-material-icon :icon="isShowCompetencyDetails ? 'arrow_drop_up' : 'arrow_drop_down'" />
        </div>
      </div>
      <div class="facet-body" v-if="isShowCompetencyDetails">
        <div
          class="facet-status"
          v-for="(competencyCount, competencySeq) in facetCompetencyMatrix.competenciesCount"
          v-bind:key="competencySeq"
          v-b-tooltip.hover
          :title="competencyCount.status"
        >
          <span class="box" v-bind:class="competencyCount.status"></span>
          <span class="count">{{competencyCount.count}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./facets-list-panel.ts">
</script>
<style lang="scss" src="./facets-list-panel.scss" scoped></style>
