<template>
  <div id="learner-facets-proficiency">
    <div class="proficiency-header">
      <month-year-picker @onChageTimeline=onChageTimeline />
    </div>
    <div class="proficiency-body">
      <div class="facets-left-panel">
        <learner-across-facets-chart :month="activeMonth" :year="activeYear"/>
      </div>
      <div class="facets-right-panel">
        <facets-info-panel />
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./learner-facets-proficiency.ts"/>
<style lang="scss" scoped src="./learner-facets-proficiency.scss"/>
