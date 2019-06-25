<template>
<div id="app-layout">
  <transition name="fade" mode="out-in">
    <router-view></router-view>
  </transition>
</div>
</template>
<script lang="ts" src="./app-layout.ts"></script>
<style  lang="scss" src="./app-layout.scss"></style>
