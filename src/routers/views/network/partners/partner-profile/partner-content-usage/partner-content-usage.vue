<template>
  <div id="content-usage-section">
    <h3>{{$t('content.usage')}}</h3>
    <div id="parnter-content-usage-map"></div>
    <content-usage-map-popup
      :activeCountry="activeCountry"
      :profileData="profileData"
      :style="popoverStyle"
      v-if="activeCountry"
    />
  </div>
</template>

<script lang="ts" src="./partner-content-usage.ts"></script>
<style lang="scss" src="./partner-content-usage.scss"></style>
