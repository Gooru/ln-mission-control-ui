<template>
    <div id="content-usage-section">
        <h3>Content Usage</h3>
        <div id="parnter-content-usage-map"></div>
        <content-usage-map-popup v-show="activeCountry" :profileData="profileData" :style="popoverStyle"/>
    </div>
</template>

<script lang="ts" src="./partner-content-usage.ts"></script>
<style lang="scss" src="./partner-content-usage.scss"></style>