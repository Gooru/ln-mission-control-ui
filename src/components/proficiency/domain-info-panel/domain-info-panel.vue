<template>
  <div id="domain-info-panel">
    <div class="domain-info-header">
      <div class="subject-classification-title" v-if="classification.code">
        {{classification.code}}/{{subject.title}}
      </div>
      <div class="domain-name">
        {{domain.domainName}}
      </div>

      <div class="close-panel" @click="$emit('onCloseDomainInfoPanel')">
        <google-material-icon icon="clear" />
      </div>
    </div>
    <div class="domain-info-body">
      <div class="competencies-list">
        <div class="competency-info" v-for="competency in domain.competencies" @click="onSelectCompetency(competency)">
          <div class="competency-header">
            <div class="code">
              {{competency.competencyCode}}
            </div>
            <div :class="['competency-status-' + competency.competencyStatus, 'status']">
            </div>
          </div>
          <div class="competency-body">
            {{competency.competencyName}}
          </div>
        </div>
      </div>
    </div>
    <competency-info-panel
      v-if="isShowCompetencyPanel"
      :competency="activeCompetency"
      @onCloseCompetencyInfoPanel = "onCloseCompetencyInfoPanel"/>
  </div>
</template>

<script lang="ts" src="./domain-info-panel.ts"></script>
<style lang="scss" src="./domain-info-panel.scss"></style>
