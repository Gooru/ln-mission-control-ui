<template>
  <div id="partners-profile-container" v-if="mapData">
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
      <profile-distribution v-if="profileData" :profileData="profileData"/>
    </div>
    <div class="partner-content-usage">
      <partner-content-usage v-if="mapData" :profileData="profileData" :mapData="mapData"/>
    </div>
  </div>
</template>



<script lang="ts" src="./partner-profile.ts"></script>
<style lang="scss" scoped  src="./partner-profile.scss"></style>