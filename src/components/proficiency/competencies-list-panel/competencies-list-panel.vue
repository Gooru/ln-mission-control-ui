<template>
  <div id="competencies-list-panel">
    <div class="competency-info" v-for="competency in competencies" @click="onSelectCompetency(competency)">
      <div class="competency-header">
        <div class="code">
          {{competency.competencyCode}}
        </div>
        <div :class="['competency-status-' + competency.competencyStatus, 'status']">
        </div>
      </div>
      <div class="competency-body">
        {{competency.competencyName}}
      </div>
    </div>
    <competency-info-panel
      v-if="isShowCompetencyPanel"
      :competency="activeCompetency"
      @onCloseCompetencyInfoPanel = "onCloseCompetencyInfoPanel"/>
  </div>
</template>

<script lang="ts" src="./competencies-list-panel.ts" />
<style lang="scss" src="./competencies-list-panel.scss" scoped />
