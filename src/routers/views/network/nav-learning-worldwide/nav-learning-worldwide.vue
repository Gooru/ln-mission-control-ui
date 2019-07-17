<template>
  <div id="mc-nav-learning-worldwide">
    <h2>{{$t('network.nav.learning.worldwide')}}</h2>
    <div id="nav-learning-worldwide-map"></div>
    <div id="overall-user-count-container">
      <div class="student count">{{numberFormat(overallStats.totalStudentsCount)}} {{$t('learners')}}</div>
      <div class="teacher count">{{numberFormat(overallStats.totalTeachersCount)}} {{$t('instructors')}}</div>
      <div class="other count">{{numberFormat(overallStats.totalOthersCount)}} {{$tc('other', 2)}}</div>
    </div>
    <nav-learning-worldwide-popover
      :style="popoverStyle"
      v-if="activeCountry"
      :country="activeCountry"
      v-show="activeCountry"
    />
  </div>
</template>
<script lang="ts" src="./nav-learning-worldwide.ts"></script>
<style lang="scss"  src="./nav-learning-worldwide.scss"></style>
