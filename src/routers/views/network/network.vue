<template>
  <div id="mc-network">
    <nav-learning-worldwide v-if="mapData" :mapData="mapData"  />
    <partners v-if="mapData && $access.hasPermission($access.ACL.partner)" :mapData="mapData"/>
  </div>
</template>

<script lang="ts" src="./network.ts"></script>
<style lang="scss" scoped src="./network.scss"></style>
