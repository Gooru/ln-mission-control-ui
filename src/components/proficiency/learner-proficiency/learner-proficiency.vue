<template>
  <div id="learner-proficiency">
    <!-- <div class="month-year-picker">
      <month-year-picker
        @onChageTimeline="onChageTimeline"/>
    </div> -->
    <div class="proficiency-panels-container">
      <div class="proficiency-left-panel">
        <div class="proficiency-body-container" v-if="activeSubject">
          <learner-proficiency-chart
            :subject="activeSubject"
            :subjectCode="subjectCode"
            :timeline = "activeTimeline"
            :userId="userId"
            :month="month"
            :year="year"
            :isDomainActive="isShowDomainInfo"
            :isCompetencyActive="isShowCompetencyPanel"
            :activeDomainSeq="activeDomainSeq"
            :activeCompetency="activeCompetency"
            @backAction="backAction"
            @onSelectDomain="onSelectDomain"
            @onSelectCompetency="onSelectCompetency"/>
        </div>
      </div>
      <div class="proficiency-right-panel" v-if="subjectCode">
        <domain-info-panel
          v-if="isShowDomainInfo"
          :domain="activeDomainInfo"
          :subject="activeSubject"
          :classification="classification"
          :userId="userId"
          :month="month"
          :year="year"
          @onCloseDomainInfoPanel = "onCloseDomainInfoPanel"
          @onSelectCompetency="onSelectCompetency"/>

        <competency-info-panel
          v-else-if="isShowCompetencyPanel"
          :competency="activeCompetency"
          :userId="userId"
          :month="month"
          :year="year"
          @onCloseCompetencyInfoPanel = "onCloseCompetencyInfoPanel"/>

        <subject-info-panel
          v-else
          :subject="activeSubject"
          :classification="activeCategory"
          :userId="userId"
          :month="month"
          :year="year"
          @onSelectDomain="onSelectDomain"
          @onSelectCompetency="onSelectCompetency"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./learner-proficiency.ts"></script>
<style lang="scss" src="./learner-proficiency.scss"></style>
