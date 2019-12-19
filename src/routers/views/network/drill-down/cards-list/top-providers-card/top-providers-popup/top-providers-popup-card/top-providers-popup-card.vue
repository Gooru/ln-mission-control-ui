<template>
    <div id="top-providers-popup-card-container">
        <div class="top-providers-popup-card-panel">
            <div class="top-providers-title">
            <div class="top-providers-panel">
                <div class="provider-identity">
                    BBC
                </div>
                <div class="provider-content">
                <div class="top-providers-header">
                    <span>#1 Content Provider</span>
                    <h4 class="provider-title">BBC Networks</h4>
                </div>
                <div class="top-providers-footer">
                    <p><span>97,303</span> activities provided this month</p>
                </div>
                </div>
            </div>
            </div>
            <div class="top-providers-progress-bar">
               <div class="progress-relevance">
                   <progress-bar label="RELEVANCE" :fillValue="0.7"/>
               </div>
               <div class="progress-engagement">
                   <progress-bar label="ENGAGEMENT" :fillValue="0.8"/>
               </div>
               <div class="progress-efficiency">
                   <progress-bar label="EFFICACY" :fillValue="0.9"/>
               </div>
            </div>
            <div class="consumed-content">
                <h4 class="consumed-bar-header">Content Consumed</h4>
            <div class="top-providers-consumed-bar">
                <consumed-progress 
                width="70%"
                icon="filter_vintage"
                count="420k"
                tradeCount="12.4%"
                 :isHigh="true"
                color="green"/>
                <consumed-progress 
                width="50%"
                :isHigh="true"
                icon="language"
                count="120k"
                tradeCount="12.4%"
                color="green"/>
                <consumed-progress 
                width="40%"
                count="60k"
                icon="volume_up"
                :isHigh="false"
                tradeCount="2.4%"
                color="red"/>
                <consumed-progress 
                width="50%"
                icon="ondemand_video"
                :isHigh="true"
                count="120k"
                tradeCount="12.4%"
                color="green"/>
                <consumed-progress 
                width="50%"
                icon="photo"
                 :isHigh="true"
                count="120k"
                tradeCount="12.4%"
                color="green"/>
                <consumed-progress 
                width="20%"
                count="20k"
                icon="list_alt"
                tradeCount="12.4%"
                color="red"/>
            </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./top-providers-popup-card.ts"></script>
<style lang="scss" scoped src="./top-providers-popup-card.scss"></style>