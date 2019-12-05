<template>
  <div id="progress-bar">
    <div class="bar-label">
      <span class="label-text">{{label}}</span>
      <span class="fill-value" :style="{'left': fillPercentage - 6 + '%'}">{{fillValue}}</span>
    </div>
    <div class="progress"><div class="fill-area" :style="{'width': fillPercentage + '%'}"></div></div>
  </div>
</template>

<script lang="ts" src="./progress-bar.ts"></script>
<style lang="scss" src="./progress-bar.scss"></style>
