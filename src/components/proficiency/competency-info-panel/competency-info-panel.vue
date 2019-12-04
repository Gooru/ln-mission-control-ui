<template>
  <div id="competency-info-panel">
    <div class="competency-info-header">
      <div class="close-panel" @click="$emit('onCloseCompetencyInfoPanel')">
        <google-material-icon icon="clear" />
      </div>
    </div>
    <div class="competency-info-body">
    </div>
    <learning-map v-if="competency" :competencyCode = "competency.competencyCode" />
  </div>
</template>


<script lang="ts" src="./competency-info-panel.ts"></script>
<style lang="scss" src="./competency-info-panel.scss"></style>
