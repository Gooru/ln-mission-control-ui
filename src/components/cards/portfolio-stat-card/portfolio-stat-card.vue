<template>
  <div id="portfolio-stat-card">
    <div class="portfolio-stat-header">
      <div class="seq-no">
        {{sequence}}.
      </div>
      <div class="stat-info" @click="$emit('onSelectPortfolioStat', statInfo)">
        <span class="title">
          {{title}}
        </span>
        <span class="total-count">
          {{totalCount}} Activities Completed
        </span>
      </div>
      <div class="toggle" @click="isShowStatDetails = !isShowStatDetails">
        <google-material-icon :icon="isShowStatDetails ? 'arrow_drop_up' : 'arrow_drop_down'" />
      </div>
    </div>
    <div v-if="isShowStatDetails" class="portfolio-stat-body">
      <div class="stat-detail" v-for="stat in statDetails">
        <span class="content-icon">
          <mc-icon :icon="stat.type + '-gray'" />
        </span>
        <span class="content-count">
          {{stat.count}}
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./portfolio-stat-card.ts"/>
<style lang="scss" scoped src="./portfolio-stat-card.scss"/>
