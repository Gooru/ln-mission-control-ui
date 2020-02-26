<template>
  <div id="facets-list-panel">
    <div
      class="facet-competency"
      v-for="(facetCompetencyMatrix, index) in facetsCompetencyMatrix"
      v-bind:key="index"
    >
      <portfolio-stat-card
        :statInfo="facetCompetencyMatrix"
        statType="facetCompetencies"
        :sequence="index + 1"
        @onSelectPortfolioStat="onSelectPortfolioStat"
      />
    </div>
  </div>
</template>

<script lang="ts" src="./facets-list-panel.ts">
</script>
<style lang="scss" src="./facets-list-panel.scss" scoped></style>
