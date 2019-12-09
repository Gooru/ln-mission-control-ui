<template>
  <div id="competency-info-panel">
    <div class="competency-info-header">
      <div class="competency-info">
        <div :class="['fill-status', 'competency-status-' + competency.competencyStatus]"></div>
        <div class="competency-code">
          <span class="domain-name">
            {{competency.domainName}}
          </span>
          <span class="code">
            {{competency.competencyCode}}
          </span>
        </div>
        <div class="competency-status-level">
          {{competencyLevel()}}
        </div>
      </div>
      <div class="close-panel" @click="$emit('onCloseCompetencyInfoPanel')">
        <google-material-icon icon="clear" />
      </div>
    </div>
    <div class="competency-info-body">
      <div class="competency-name">
        {{competency.competencyName}}
      </div>
      <div class="tabbed-header">
        <div class="tab-item" v-for="tabItem in tabItems" v-bind:class="{active : activeTab.title == tabItem.title}" @click="activeTab = tabItem">
          {{tabItem.title}}
        </div>
      </div>
      <div class="active-tab-contents">
      </div>
    </div>
    <!-- <learning-map v-if="competency" :competencyCode = "competency.competencyCode" /> -->
  </div>
</template>


<script lang="ts" src="./competency-info-panel.ts"></script>
<style lang="scss" src="./competency-info-panel.scss"></style>
