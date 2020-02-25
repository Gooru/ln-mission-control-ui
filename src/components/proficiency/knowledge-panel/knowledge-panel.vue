<template>
  <div id="knowledge-panel">
    <div class="domains-panel-container" v-if="statsBucket === 'subject'">
      <div class="panel-header-container"  @click="isShowDomainList = !isShowDomainList">
        <span>Proficiency</span><span class="toggle"><google-material-icon :icon="isShowDomainList ? 'arrow_drop_up' : 'arrow_drop_down'" /></span>
      </div>
      <div class="panel-body-container" v-if="isShowDomainList">
        <domains-list-panel
        v-bind="{statsBucket, userId, month, year, subject, classification}"
        @onSelectDomain="onSelectDomain"
        @onSelectCompetency="onSelectCompetency" />
      </div>
    </div>
    <div class="competencies-panel-container" v-if="statsBucket === 'domain'">
      <div class="panel-header-container" @click="isShowCompetencyList = !isShowCompetencyList">
        <span>Proficiency</span><span class="toggle"><google-material-icon :icon="isShowCompetencyList ? 'arrow_drop_up' : 'arrow_drop_down'" /></span>
      </div>
      <div class="panel-body-container" v-if="isShowCompetencyList">
        <competencies-list-panel
        v-bind="{statsBucket, userId, month, year, subject, domain}"
        @onSelectDomain="onSelectDomain"
        @onSelectCompetency="onSelectCompetency"
        />
      </div>
    </div>
    <div class="portfolio-panel-container">
      <div class="panel-header-container" @click="isShowPortfolioContainer = !isShowPortfolioContainer">
        <span>Portfolio</span><span class="toggle"><google-material-icon :icon="isShowPortfolioContainer ? 'arrow_drop_up' : 'arrow_drop_down'" /></span>
      </div>
      <div class="panel-body-container" v-if="isShowPortfolioContainer">
        <portfolio-panel
        v-bind="{statsBucket, userId, month, year, activeFacets, classification, subject, domain, competency}"
        @onSelectPortfolioStat="onSelectPortfolioStat"/>
      </div>
    </div>
    <div class="preferences-panel-container">
      <div class="panel-header-container" @click="isShowPreferencesContainer = !isShowPreferencesContainer">
        <span>Preferences</span><span class="toggle"><google-material-icon :icon="isShowPreferencesContainer ? 'arrow_drop_up' : 'arrow_drop_down'" /></span>
      </div>
      <div class="panel-body-container" v-if="isShowPreferencesContainer">
        <div class="panel-body-container">
          <preferences-panel
          v-bind="{statsBucket, userId, month, year, activeFacets, subject, domain, competency}"
          @onSelectPortfolioStat="onSelectPortfolioStat"/>
        </div>
      </div>
    </div>

    <!-- TODO Learning Map and Metadat about competency may not required for now! -->
    <div class="learning-map-panel-container" v-if="false">
      <div class="panel-header-container" @click="isShowLearningMap = !isShowLearningMap">
        <span>Learning Map</span><span class="toggle"><google-material-icon :icon="isShowLearningMap ? 'arrow_drop_up' : 'arrow_drop_down'" /></span>
      </div>
      <div class="panel-body-container" v-if="isShowLearningMap">
        <learning-map
        v-bind="{competency, learningMapData, statsBucket, userId, month, year}"
        />
      </div>
    </div>

    <div class="metadata-panel-container" v-if="false">
      <div class="panel-header-container" @click="isShowMetadata = !isShowMetadata">
        <span>Metadata</span><span class="toggle"><google-material-icon :icon="isShowMetadata ? 'arrow_drop_up' : 'arrow_drop_down'" /></span>
      </div>
      <div class="panel-body-container" v-if="isShowMetadata">
        <metadata-panel
        v-bind="{competency, learningMapData, statsBucket, userId, month, year}"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./knowledge-panel.ts"> </script>
<style lang="scss" src="./knowledge-panel.scss" scoped></style>
