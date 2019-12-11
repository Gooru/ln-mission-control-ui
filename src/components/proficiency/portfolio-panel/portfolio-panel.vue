<template>
  <div id="portfolio-panel">
    <div class="portfolio-body">
      <div v-if="isLoadContents || statsBucket == 'competency'" class="content-card-container">
        <div v-for="content in portfolioContents">
          <portfolio-content-card :content="content" />
        </div>
      </div>
      <div v-else>
        <div v-for="(statInfo, index) in portfolioStats">
          <portfolio-stat-card :statInfo="statInfo" :statType="statsBucket" :sequence="index + 1" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./portfolio-panel.ts"></script>
<style lang="scss" src='./portfolio-panel.scss'></style>
