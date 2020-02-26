<template>
    <div id="avarage-card-container">
        <div class="avarage-card-panel">
            <div :class="['avarage-card-header', cardName]">
                <h4 class="new-user-count">{{cardValue}}</h4>
                <div :class="['user-details-panel', {'right-alignment': cardName !== 'class-activity'}]">
                    <div class="user-details-title">
                        <material-icon :icon="iconName" />
                        {{cardTitle}}
                    </div>
                    <ul class="texas-card-list">
                    <li :class="['down', {high: isLowPercent(cardData.percent) > 0} ]"><material-icon :icon=" isLowPercent(cardData.percent) > 0 ? 'trending_up' : 'trending_down'"/></li>
                    <li :class="['down', {high: isLowPercent(cardData.percent) > 0} ]">{{cardData.percent ? cardData.percent : ''}}</li>
                    <li>since last {{sinceMonth}}</li>
                   </ul>
                </div>
            </div>
            <div class="avarage-card-footer" >
                <p v-if="cardName === 'new-user'">v/s <span> {{ cardData.overall ? numberFormat(cardData.overall) : '' }}</span> on avg across all {{ $t('common.' + nextLevelName) }}</p>
                <p v-if="cardName !== 'new-user'">v/s <span> {{ cardData.overall ? cardData.overall : '' }}</span> on avg across all {{ $t('common.' + nextLevelName) }}</p>
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