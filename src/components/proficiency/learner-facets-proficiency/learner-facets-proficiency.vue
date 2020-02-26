<template>
  <div id="learner-facets-proficiency">
    <div class="proficiency-header">
      <div class="back-action" @click="onClickBack()">
        <google-material-icon icon="keyboard_backspace" />
      </div>
      <div class="learner-info">
        <div class="learner-thumbnail" :style="{'background-image': 'url('+ learner.thumbnailUrl +')'}"></div>
        <div class="learner-name">
          <span class="student-label">
            Student
          </span>
          <span class="student-name">
            {{learner.fullName}}
          </span>
        </div>
      </div>
      <div class="month-picker">
        <month-year-picker @onChageTimeline="onChageTimeline" :startYear="learner.createdAt" />
      </div>
    </div>
    <div v-if="isShowFacetsProficiency" class="facets-proficiency-body">
      <div class="facets-left-panel">
        <div class="left-panel-header">
          <div class="learner-info">
            <div class="student-name">{{learner.firstName}}'s Complete Skyline</div>
            <div class="skyline-info">Each bar represents a facet</div>
          </div>
          <div class="facet-toggle" @click="isShowExpandedFacetChart = !isShowExpandedFacetChart">
            <google-material-icon :icon="isShowExpandedFacetChart ? 'unfold_less' : 'unfold_more'"/> Show {{isShowExpandedFacetChart ? 'Compressed' : 'Expanded'}} Chart
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
          :facets="activeFacets"
          :userId="learnerId"
          :isExpandedMode="isShowExpandedFacetChart"
          @facetsCompetencyMatrix="getFacetsCompetencyMatrix"/>
        </div>
      </div>
      <div v-if="activeFacets.length" class="facets-right-panel">
        <facets-info-panel
        :userId="learnerId"
        :month="activeMonth"
        :year="activeYear"
        :activeFacets="activeFacets"
        :facetsCompetencyMatrix="facetsCompetencyMatrix"
        @onSelectPortfolioStat="onSelectPortfolioStat"/>
      </div>
    </div>
    <div v-else class="subject-proficiency-body">
      <learner-proficiency
      :classificationCode="activeClassificationCode"
      :activeSubject="activeSubject"
      :month="activeMonth"
      :year="activeYear"
      @backAction="backAction"
      :userId="learnerId"/>
    </div>
  </div>
</template>

<script lang="ts" src="./learner-facets-proficiency.ts"/>
<style lang="scss" scoped src="./learner-facets-proficiency.scss"/>
