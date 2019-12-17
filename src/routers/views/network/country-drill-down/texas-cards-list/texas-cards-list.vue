<template>
  <div id="texas-cards-list-container">
    <div class="new-user-card">
      <new-user-card iconName="people" :cardValue="cardDetails.user_count" cardTitle="New Users" cardName="new-user"/>
    </div>
    <div class="competency-performance-card">
      <competency-gained-card :score="competencyData.overallStats ? competencyData.overallStats : {}" :competencySelectLevel="seletedLevel" :subjectsList="subjectsList" :selectedDate="selectedDate" :countryData="countryData"/>
    </div>
    <div class="suggestion-mode-card" v-if="hiddenData">
      <new-user-card iconName="explore" cardValue="91k" cardTitle="Suggestions mode" cardName="suggestion"/>
    </div>
    <div class="avarage-time-card">
      <new-user-card iconName="access_time" :cardValue="cardDetails.avg_count" cardTitle="Avg. session time" cardName="avarage-time"/>
    </div>
    <div class="top-provider-card" v-if="hiddenData">
      <top-providers />
    </div>
    <div class="class-activities-card">
      <new-user-card  :cardValue="cardDetails.gained_comp" cardTitle="of students gained > 10 competencies" cardName="class-activity"/>
    </div>
     <div class="struggling-competency">
      <struggling-competency :strugglingCompetencies="cardDetails.stugglingCompetency" />
    </div>
  </div>
</template>
<script lang="ts" src="./texas-cards-list.ts"></script>
<style lang="scss" scoped src="./texas-cards-list.scss"></style>
