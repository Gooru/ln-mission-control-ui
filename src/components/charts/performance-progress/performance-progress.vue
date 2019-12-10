<template>
  <div id="performance-progress-bar">
    <span :style="{'width': progressWidth,'backgroundColor':backgroundColor}"></span>
    <span :if="progressWidth1" :style="{'width': progressWidth1,'backgroundColor':backgroundColor1}"></span>
  </div>
</template>

<script lang="ts" src="./performance-progress.ts"></script>
<style lang="scss" src="./performance-progress.scss"></style>
