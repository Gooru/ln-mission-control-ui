<template>
    <div id="texas-card-container" v-if="cardData.length">
        <div class="texas-district-title">
         <h5 class="texas-distict-name">{{$t('common.'+cardName)}}</h5>
            <material-icon icon="search" />
         </div>
          <div class="texas-district-card" v-for="(level, levelIndex) in cardData" :key="levelIndex" @click="onSelectLevel(level)">
              <div class="card-heading">
                <h5 class="card-title">{{level.type ? level.name : level.fullName}}</h5>
                <ul class="texas-card-list" v-if="hiddenData">
                    <li><material-icon icon="trending_up"/></li>
                    <li>37%</li>
                    <li>since june</li>
                </ul>
              </div>
              <div class="card-total">
                  <h4 class="total-count">{{numberFormat(level.completedCompetencies)}}</h4>
                  <span>Total</span>
              </div>
          </div>
    </div>
</template>

<script lang="ts" src="./level-card.ts"></script>
<style lang="scss" src="./level-card.scss"></style>