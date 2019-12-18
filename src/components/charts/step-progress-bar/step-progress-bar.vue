<template>
  <div id="step-progress-bar">
    <div class="progress">
      <span class="fill-area" :style="{'width': fillPercentage + '%'}">
      </span>
      <span class="connector" :style="{'left': connectorPos + '%'}" v-for="connectorPos in connectors"></span>
    </div>
  </div>
</template>

<script lang="ts" src="./step-progress-bar.ts"></script>
<style lang="scss" src="./step-progress-bar.scss"></style>
