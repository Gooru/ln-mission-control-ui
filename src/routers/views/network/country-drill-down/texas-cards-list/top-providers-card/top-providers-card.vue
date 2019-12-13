<template>
    <div id="top-providers-container">
        <div class="top-providers-panel" v-on="isEnablePopup ? {click: () => isShowPopup = !isShowPopup} : {}">
            <div class="provider-identity">
                BBC
            </div>
            <div class="provider-content">
             <div class="top-providers-header">
                 <span>Top Providers</span>
                 <h4 class="provider-title">BBC Networks</h4>
            </div>
            <div class="top-providers-footer">
                <p><span>97,303</span> activities provided this month</p>
            </div>
            </div>
        </div>
       <div class="card-popup-card" v-if="isShowPopup && isEnablePopup">
           <top-providers-popup v-on:onGoBack="closePopup" />
       </div>
       
    </div>
</template>

<script lang="ts" src="./top-providers-card.ts"></script>
<style lang="scss" scoped src="./top-providers-card.scss"></style>