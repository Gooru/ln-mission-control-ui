<template>
    <div id="avarage-card-container">
        <div class="avarage-card-panel">
            <div :class="['avarage-card-header', cardName]">
                <h4 class="new-user-count">{{cardValue}}</h4>
                <div class="user-details-panel">
                    <div class="user-details-title">
                        <material-icon :icon="iconName" />
                        {{cardTitle}}
                    </div>
                    <ul class="texas-card-list" v-if="hiddenData">
                    <li class="down"><material-icon icon="trending_down"/></li>
                    <li class="down">37%</li>
                    <li>since june</li>
                   </ul>
                </div>
            </div>
            <div class="avarage-card-footer" v-if="hiddenData">
                <p>v/s <span>97,303</span> avarage across all States</p>
            </div>
        </div>
       <div class="card-popup-card">
            <new-user-popup v-on:onGoBack="closePopup" v-if="isShowPopup && cardName === 'new-user'"/>
            <avg-session-popup v-on:onGoBack="closePopup" v-if="isShowPopup && cardName === 'avarage-time'"/>
       </div>
       
    </div>
</template>

<script lang="ts" src="./new-user-avarage-card.ts"></script>
<style lang="scss" scoped src="./new-user-avarage-card.scss"></style>