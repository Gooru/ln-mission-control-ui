<template>
  <div id="texas-cards-list-container">
    <div class="new-user-card">
      <new-user-card iconName="people" cardTitle="New Users in July" cardName="new-user"/>
    </div>
    <div class="competency-performance-card">
      <competency-gained-card/>
    </div>
    <div class="suggestion-mode-card">
      <new-user-card iconName="explore" cardTitle="Suggestions mode" cardName="suggestion"/>
    </div>
    <div class="avarage-time-card">
      <new-user-card iconName="access_time" cardTitle="Avg. session time" cardName="avarage-time"/>
    </div>
    <div class="top-provider-card">
      <top-providers />
    </div>
    <div class="class-activities-card">
      <new-user-card iconName="people" cardTitle="Class Activities Conducted" cardName="class-activity"/>
    </div>
  </div>
</template>
<script lang="ts" src="./texas-cards-list.ts"></script>
<style lang="scss" scoped src="./texas-cards-list.scss"></style>