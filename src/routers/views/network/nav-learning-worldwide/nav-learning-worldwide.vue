<template>
<div id="mc-nav-learning-worldwide">
  <h2>{{$t('network.nav.learning.worldwide')}}</h2>
  <div id="nav-learning-worldwide-map"></div>
  <div id="overall-user-count-container">
    <div class="student count">{{numberFormat(111)}} Students</div>
    <div class="teacher count">123223 Teacher</div>
    <div class="other count">123223 Others</div>
  </div>
</div>
</template>
<script lang="ts" src="./nav-learning-worldwide.ts"></script>
<style lang="scss"  src="./nav-learning-worldwide.scss"></style>
