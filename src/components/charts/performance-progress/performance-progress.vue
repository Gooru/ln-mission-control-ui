<template>
  <div id="performance-progress-bar">
    <span v-for="(width, widthIndex) in totalWidth" :key="widthIndex" :style="{'width': width,'backgroundColor': color[widthIndex]}"></span>
  </div>
</template>

<script lang="ts" src="./performance-progress.ts"></script>
<style lang="scss" src="./performance-progress.scss"></style>
