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
          :key="activeDomainInfo.domainCode"
          @onCloseDomainInfoPanel = "onCloseDomainInfoPanel"/>

        <competency-info-panel
          v-else-if="isShowCompetencyPanel"
          :competency="activeCompetency"
          @onCloseCompetencyInfoPanel = "onCloseCompetencyInfoPanel"
          :userId="userId"
          :month="month"
          :year="year"/>

        <subject-info-panel
          v-else
          :subject="activeSubject"
          :classification="activeCategory"
          :userId="userId"
          :month="month"
          :year="year" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./learner-proficiency.ts"></script>
<style lang="scss" src="./learner-proficiency.scss"></style>
