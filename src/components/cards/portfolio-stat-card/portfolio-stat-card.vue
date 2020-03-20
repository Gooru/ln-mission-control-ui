<template>
  <div id="portfolio-stat-card">
    <div class="portfolio-stat-header">
      <div class="seq-no">{{sequence}}.</div>
      <div class="stat-info" @click="$emit('onSelectPortfolioStat', statInfo)">
        <span class="title">{{title}}</span>
        <span class="total-count">
          {{totalCount}}
          <span v-if="statType === 'facetCompetencies'">Competencies</span>
          <span v-else>Activities Completed</span>
        </span>
      </div>
      <div class="toggle" @click="isShowStatDetails = !isShowStatDetails">
        <google-material-icon :icon="isShowStatDetails ? 'arrow_drop_up' : 'arrow_drop_down'" />
      </div>
    </div>
    <div v-if="isShowStatDetails" class="portfolio-stat-body">
      <div v-if="statType === 'facetCompetencies'">
        <div
          class="facet-status"
          v-for="(competencyCount, competencySeq) in statInfo.competenciesCount"
          v-bind:key="competencySeq"
          v-b-tooltip.hover
          :title="competencyCount.status"
        >
          <span class="box" v-bind:class="competencyCount.status"></span>
          <span class="count">{{competencyCount.count}}</span>
        </div>
      </div>
      <div v-else>
        <div class="stat-detail" v-for="(stat, index) in statDetails" @click="$emit('onSelectPortfolioStat', statInfo)" v-bind:key="index">
          <span class="content-icon">
            <mc-icon :icon="stat.type + '-gray'" />
          </span>
          <span class="content-count">{{stat.count}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./portfolio-stat-card.ts"/>
<style lang="scss" scoped src="./portfolio-stat-card.scss"/>
