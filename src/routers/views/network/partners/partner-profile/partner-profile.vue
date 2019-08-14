<template>
  <div id="partners-profile-container">
    <div id="partner-profile-data">
      <div class="partner-info-section">
        <div class="back-button" @click="back()">
          <google-material-icon icon="arrow_back"/>
        </div>
        <div class="profile-content">
          <profile-info v-if="mapData" :mapData="mapData" :profileData="profileData"/>
        </div>
      </div>
    </div>
    <div class="profile-distribution">
      <profile-distribution/>
    </div>
    <div class="partner-content-usage">
      <partner-content-usage v-if="mapData" :mapData="mapData"/>
    </div>
  </div>
</template>



<script lang="ts" src="./partner-profile.ts"></script>
<style lang="scss" scoped  src="./partner-profile.scss"></style>