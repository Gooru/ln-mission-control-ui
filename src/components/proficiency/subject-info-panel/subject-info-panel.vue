<template>
  <div id="subject-info-panel">
    <div class="subject-info-header">
      <div class="panel-label">
        Vital Statistics
      </div>
      <div class="subject-title">
        for {{subject.title}}
      </div>
    </div>
    <div class="subject-info-body">
      <div class="tabbed-header">
        <div class="tab-item" v-for="tabItem in tabItems" v-bind:class="{active : activeTab.title == tabItem.title}" @click="activeTab = tabItem">
          {{tabItem.title}}
        </div>
      </div>
      <div class="active-tab-contents">
        <component
          v-bind:is="activeTab.component"
          v-bind="{month: month, year: year, subject: subject, classification: classification, statsBucket: 'subject', userId: userId}"
          @onSelectDomain="onSelectDomain"
          @onSelectCompetency="onSelectCompetency"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./subject-info-panel.ts"> </script>
<style lang="scss" src="./subject-info-panel.scss"> </style>
