<template>
  <div id="learner-proficiency-chart">
    <div class="chart-actions">
      <div class="grade-selector">
        <div class="active-grade" @click="isShowTaxonomyGradeList = !isShowTaxonomyGradeList">
          Hi-Line {{activeGrade.grade}} <google-material-icon :icon="isShowTaxonomyGradeList ? 'arrow_drop_up' : 'arrow_drop_down'"/>
        </div>
        <div class="taxonomy-grade-list" v-if="isShowTaxonomyGradeList">
          <div class="taxonomy-grade" v-for="taxonomyGrade in taxonomyGrades" v-bind:class="{active : taxonomyGrade == activeGrade}" @click="onSelectGrade(taxonomyGrade)">
            {{taxonomyGrade.grade}}
          </div>
        </div>
      </div>
      <div class="toggle-graph-view" @click="onToggleGraphView()"><google-material-icon :icon="isShowExpandedGraph ? 'unfold_less' : 'unfold_more'"/> Show {{isShowExpandedGraph ? 'Compressed' : 'Expanded'}} Chart</div>
    </div>
    <div class="proficiency-chart-container">
      <div class="loading-spinner">
        <b-spinner v-if="isLoading" variant="primary" label="Spinning"></b-spinner>
      </div>
      <div id="chart-area"></div>
    </div>
  </div>
</template>

<script lang="ts" src="./learner-proficiency-chart.ts"></script>
<style lang="scss">
  @import "./learner-proficiency-chart.scss";
</style>
