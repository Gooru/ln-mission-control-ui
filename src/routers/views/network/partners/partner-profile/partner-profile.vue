<template>
  <div id="partners-profile-container" v-if="mapData">
    <div id="partner-profile-data">
      <div class="partner-info-section">
        <div class="back-button">
         <div @click="back()">
            <google-material-icon icon="arrow_back"/>
         </div>
        </div>
        <div class="profile-content">
          <profile-info :mapData="mapData" :partnerProfile="partnerProfile"/>
        </div>
      </div>
    </div>
    <div class="profile-distribution">
      <profile-distribution  :partnerProfile="partnerProfile"/>
    </div>
    <div class="partner-content-usage">
      <partner-content-usage  :partnerProfile="partnerProfile" :mapData="mapData"/>
    </div>
  </div>
</template>

<script lang="ts" src="./partner-profile.ts"></script>
<style lang="scss" scoped  src="./partner-profile.scss"></style>
