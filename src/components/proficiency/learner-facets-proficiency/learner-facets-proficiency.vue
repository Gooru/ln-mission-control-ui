<template>
  <div id="learner-facets-proficiency">
    <div class="proficiency-header">
      <month-year-picker @onChageTimeline="onChageTimeline" />
    </div>
    <div v-if="isShowFacetsProficiency" class="facets-proficiency-body">
      <div class="facets-left-panel">
        <div class="left-panel-header">
          <div class="learner-info">
            <div class="student-name">StudentName's Complete Skyline</div>
            <div class="skyline-info">Each bar represent a subject within the relevant category</div>
          </div>
          <div class="filter-container">
            <taxonomy-filter @listActiveFacets="listActiveFacets" />
          </div>
        </div>
        <div class="left-panel-body">
          <learner-across-facets-chart
            :month="activeMonth"
            :year="activeYear"
            @onSelectSubject="onSelectSubject"
            :facets="activeFacets" />
        </div>
      </div>
      <div class="facets-right-panel">
        <facets-info-panel />
      </div>
    </div>
    <div v-else class="subject-proficiency-body">
      <learner-proficiency
        :classificationCode="activeClassificationCode"
        :activeSubject="activeSubject"
        @backAction="backAction" />
    </div>
  </div>
</template>

<script lang="ts" src="./learner-facets-proficiency.ts"/>
<style lang="scss" scoped src="./learner-facets-proficiency.scss"/>
