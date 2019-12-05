<template>
  <div id="preferences-panel">
    <div class="preference-info" v-for="preference in preferenceItems">
      <div class="label-info">
        <span class="icon" :class="preference.format">
          <mc-icon :icon="preference.icon" />
        </span>
        <span class="label-text">{{preference.label}}</span>
        <span class="label-value">{{preference.value}}</span>
      </div>
      <step-progress-bar :fillLevel="preference.value"/>
    </div>
  </div>
</template>

<script lang="ts" src="./preferences-panel.ts"></script>
<style lang="scss" src="./preferences-panel.scss"></style>
