<template>
    <div id="top-providers-pullup-container">
        <div class="backdrop" @click="onGoBack()"></div>
        <div class="top-providers-pullup-panel">
            <div class="top-providers-pullup-panel-heading">
                <div class="top-providers-pullup-top-header">
                    <div class="top-providers-pullup-back" @click="onGoBack">
                        <material-icon icon="arrow_back"/>
                        <span>Back to Dashboard</span>
                    </div>
                    <h4 class="top-providers-pullup-title">
                         Content Providers
                    </h4>
                </div>
                <div class="top-providers-pullup-nav-tab-panel">
                    <ul class="nav-tab-list-blk">
                        <li class="active">All</li>
                        <li>Math</li>
                        <li>Physics</li>
                        <li>Economics</li>
                        <li>ela</li>
                        <li>philosophy</li>
                        <li>chemistry</li>
                        <li>social studies</li>
                    </ul>
                </div>
            </div>
            <div class="top-providers-pullup-panel-body">
                <top-provider-popup-card />
            </div>
        </div>
        
    </div>
</template>

<script lang="ts" src="./top-providers-popup.ts"></script>
<style lang="scss" scoped src="./top-providers-popup.scss"></style>