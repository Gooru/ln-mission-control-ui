<template>
<div id="mc-nav-learning-worldwide">
  <h2>{{$t('network.nav.learning.worldwide')}}</h2>
  <div id="nav-learning-worldwide-map"></div>
  <div id="overall-user-count-container">
    <div class="student count">{{numberFormat(totalStudentCount)}} {{$tc('student', 2)}}</div>
    <div class="teacher count">{{numberFormat(totalTeacherCount)}} {{$tc('teacher', 2)}}</div>
    <div class="other count">{{numberFormat(totalOtherCount)}} {{$tc('other', 2)}}</div>
  </div>
</div>
</template>
<script lang="ts" src="./nav-learning-worldwide.ts"></script>
<style lang="scss"  src="./nav-learning-worldwide.scss"></style>
