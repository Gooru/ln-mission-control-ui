<template>
    <div id="avg-session-pullup-container">
        <div class="backdrop" @click="onGoBack()"></div>
        <div class="avg-session-panel">
            <div class="avg-session-panel-heading">
                <div class="avg-session-top-header">
                    <div class="avg-session-back" @click="onGoBack">
                        <material-icon icon="arrow_back"/>
                        <span>Back to Dashboard</span>
                    </div>
                    <h4 class="avg-session-title">
                        Time Spent Studying
                    </h4>
                </div>
                <div class="avg-session-nav-tab-panel">
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
            <div class="avg-session-panel-body">
                <div class="avg-session-left"></div>
                <div class="avg-session-right">
                    <div class="avg-session-right-panel">
                        <div class="avg-session-panel-title">State of Texas</div>
                        <div class="avg-session-panel-sub-body">
                        <div class="avg-session-sub-title">
                            <div class="avg-session-sub-title-left">
                                <span>Avg. session time per district</span>
                            </div>
                            <div class="avg-session-sub-title-right">
                                <ul class="avg-session-sub-title-blk" >
                                    <li>audio</li>
                                    <li>video</li>
                                    <li>interactive</li>
                                    <li>text</li>
                                    <li>web page</li>
                                    <li>others</li>
                                </ul>
                            </div>
                        </div>
                        <div class="avg-session-sub-body">
                             <div class="avg-session-sub-body-left">
                                 <div class="level-title">district 1</div>
                                 <div class="level-time"> 30m</div>
                             </div>
                            <div class="avg-session-sub-body-right">

                            </div>
                        </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
        
    </div>
</template>

<script lang="ts" src="./avg-session-popup.ts"></script>
<style lang="scss" scoped src="./avg-session-popup.scss"></style>