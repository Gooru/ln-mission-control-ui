<template>
  <div id="mc-network">
    <nav-learning-worldwide v-if="mapData && !isLoading && (isDrilldown || isTenant)" :mapData="mapData"  />
    <partners v-if="mapData && isTenant" :mapData="mapData"/>
  </div>
</template>

<script lang="ts" src="./network.ts"></script>
<style lang="scss" scoped src="./network.scss"></style>
