<template>
  <div id="metadata-panel">
    <div class="micro-competencies-container">
      <div class="micro-competencies-header">
        Micro Competencies
      </div>
      <div class="micro-competencies-body">
        <div class="micro-competency-container" v-for="(microCompetency, seq) in microCompetencies" :key="seq">
          <div class="code" v-b-tooltip.hover :title="microCompetency.title" placement="top">
            {{microCompetency.id}}
          </div>
        </div>
      </div>
    </div>
    <div class="prerequisites-container">
      <div class="prerequisites-header">
        prerequisite Competencies
      </div>
      <div class="prerequisites-body">
        <div class="prerequisite-card" v-for="(prerequisite, index) in prerequisites" :key="index">
          <div class="card-info">
            <span>{{prerequisite.code}}</span>
            <span></span>
          </div>
          <div class="card-details">
            {{prerequisite.title}}
          </div>
        </div>
      </div>
    </div>
    <div class="alt-concepts-container">
      <div class="alt-c-header">
        ALT-CONCEPTS
      </div>
      <div class="alt-c-body">
        There are no alt-concepts defined for this competency
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./metadata-panel.ts"> </script>
<style lang="scss" src="./metadata-panel.scss" scoped></style>
