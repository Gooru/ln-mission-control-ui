<template>
  <div id="facets-info-panel">
    <div class="info-panel-header">
      <div class="panel-header-label">
        <span class="panel-label">Vital Statistics</span>
        <span class="panel-label">Across Facets</span>
      </div>
    </div>
    <div class="info-panel-body">
      <div class="tabbed-header">
        <div class="tab-item" v-for="tabItem in tabItems" :class="{active: activeTab.label == tabItem.label}" @click="activeTab = tabItem">
          {{tabItem.label}}
        </div>
      </div>
      <div class="active-tab-contents">
        <component
          v-bind:is="activeTab.component"
          v-bind="{statsBucket: 'facets', userId: userId, month: month, year: year}"
          @onSelectPortfolioStat="onSelectPortfolioStat"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./facets-info-panel.ts"></script>
<style lang="scss" src="./facets-info-panel.scss"></style>
