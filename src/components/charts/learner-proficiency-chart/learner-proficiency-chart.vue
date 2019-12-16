<template>
  <div id="learner-proficiency-chart">
    <div class="chart-actions">
      <div class="back-action">
        <div class="back-icon" @click="$emit('backAction')">
          <google-material-icon icon="keyboard_backspace" />
        </div>
        <span class="subject-title">{{subject.title}}</span>
      </div>
      <div class="toggle-graph-view" @click="onToggleGraphView()"><google-material-icon :icon="isShowExpandedGraph ? 'unfold_less' : 'unfold_more'"/> Show {{isShowExpandedGraph ? 'Compressed' : 'Expanded'}} Chart</div>
    </div>
    <div class="chart-view">
      <div v-if="taxonomyGrades.length > 0" class="grade-selector">
        <div class="grade-label">
          <!-- Hi-Line {{activeGrade.grade}} <google-material-icon :icon="isShowTaxonomyGradeList ? 'arrow_drop_up' : 'arrow_drop_down'"/> -->
          Grade Selector
        </div>
        <div class="taxonomy-grade-list">
          <div class="taxonomy-grade" v-for="taxonomyGrade in taxonomyGrades" v-bind:class="{active : taxonomyGrade == activeGrade}" @click="onSelectGrade(taxonomyGrade)">
            <google-material-icon icon="adjust" />{{taxonomyGrade.grade}}
          </div>
        </div>
      </div>
      <div class="graph-visual">
        <!-- <div class="proficiency-chart-container"> -->
          <!-- <div class="loading-spinner" v-if="isLoading">
            <b-spinner variant="primary" label="Spinning"></b-spinner>
          </div> -->
          <div id="chart-area"></div>
        <!-- </div> -->
        <div class="domains-seq-list" v-if="chartData">
          <div class="domain-seq" v-for="domain in chartData" :key="domain.domainSeq" :style="{width: cellWidth + 'px'}" @click="onSelectDomain(domain)">
            {{domain.domainSeq}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./learner-proficiency-chart.ts"></script>
<style lang="scss" src="./learner-proficiency-chart.scss"></style>
