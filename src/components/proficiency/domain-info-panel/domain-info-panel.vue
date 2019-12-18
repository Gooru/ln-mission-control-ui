<template>
  <div id="domain-info-panel">
    <div class="domain-info-header">
      <div class="subject-classification-title">
        <!-- {{classification.code}} /  -->
        {{subject.title}}
      </div>
      <div class="domain-name">
        {{domain.domainName}}
      </div>

      <div class="close-panel" @click="$emit('onCloseDomainInfoPanel')">
        <google-material-icon icon="clear" />
      </div>
    </div>
    <div class="domain-info-body">
      <div class="tabbed-header">
        <div class="tab-item" v-for="tabItem in tabItems" :class="{active: activeTab.title == tabItem.title}" @click="activeTab = tabItem">
          {{tabItem.title}}
        </div>
      </div>
        <div class="active-tab-contents">
          <component
            v-bind:is="activeTab.component"
            v-bind="{ month: month, year: year, subject: subject, domain: domain, statsBucket: 'domain', userId: userId}"
            @onSelectCompetency="onSelectCompetency"/>
        </div>
    </div>
  </div>
</template>

<script lang="ts" src="./domain-info-panel.ts"></script>
<style lang="scss" src="./domain-info-panel.scss"></style>
