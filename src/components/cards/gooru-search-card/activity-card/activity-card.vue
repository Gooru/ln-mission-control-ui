<template>
    <div class="activity-card-container"> 
        <div class="activity-card-panel">
        <div class="activity-card-panel-head">
            <div class="panel-title">
                <span :class="['icon']"></span>
                <div class="title-box">
                    <span class="title"></span>
                    <ul class="title-blk">
                        <li><span class="activity-icon"></span> <span class="icon">count</span></li>
                    </ul>
                </div>
                <div class="action-buttons">
                    <span class="play"></span>
                    <span class="toggle"></span>
                </div>
            </div>
            <div class="panel-thumbnail"></div>
        </div>
        <div class="panel-body">
              <div class="activity-description">

              </div>
        <div class="sub-activity-content">
             <div class="sub-panel-heading">
                 <span class="sub-icon"></span>
                 <div class="sub-content-title-panel">
                     <span class="title"></span>
                     <span class="sub-title"></span>
                 </div>
                 <span class="sub-toggle"></span>
             </div>
             <div class="sub-panel-body">
                 <div class="sub-panel-description"></div>
             </div>
        </div>
        </div>
        </div>
    </div>
</template>

<script lang="ts" src="./activity-card.ts"></script>
<style lang="scss" src="./activity-card.scss"></style>