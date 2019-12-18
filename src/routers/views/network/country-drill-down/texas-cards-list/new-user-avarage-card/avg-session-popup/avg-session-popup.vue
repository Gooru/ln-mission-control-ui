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
                <div class="avg-session-left">
                    <div class="avg-session-time-icon">
                        <material-icon icon="access_time"/>
                    </div>
                    <div class="avg-session-title">
                        <h4 class="avg-session-time-count">25m</h4>
                        <span class="avg-session-time-title">Avg. Session time</span>
                    </div>
                    <div class="avg-session-trading">
                        <h4 class="trading-percent"><material-icon icon="arrow_upward"/>11.39%</h4>
                        <span>Since last month</span>
                    </div>
                </div>
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
                                    <li class="audio"><material-icon icon="volume_up" />audio</li>
                                    <li class="video"><material-icon icon="ondemand_video"/>video</li>
                                    <li class="interactive"> <material-icon icon="filter_vintage"/>interactive</li>
                                    <li class="text"><material-icon icon="list_alt" />text</li>
                                    <li class="webpage"><material-icon icon="language" />web page</li>
                                    <li class="other"><material-icon icon="image" />others</li>
                                </ul>
                            </div>
                        </div>
                        <div class="avg-session-sub-body" v-for="list in itrate" :key="list">
                             <div class="avg-session-sub-body-left">
                                 <div class="level-title">district 1</div>
                                 <div class="level-time"> 30m</div>
                             </div>
                            <div class="avg-session-sub-body-right">
                                <performance-bar isEnbleHover="true" v-on:onHideMessage="onHideMessage" v-on:onShowMessage="onShowMessage" :totalWidth="['10%','20%','30%','20%']" :color="['#141f82','#2b3ca3','#3a4eba','#7a87cf']" />
                            </div>
                        </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
        <div class="message-box" :style="messageBoxStyle" v-if="isShowMessage">
            <h4 class="header"><material-icon icon="list_alt"/> 8m</h4>     
            <div class="body">
                <span>Avg. time spent</span>
                <ul class="time-spent">
                    <li><material-icon icon="trending_up" /></li>
                    <li>37%</li>
                    <li>since july</li>
                </ul>
            </div>   
            <div class="footer">
                <span>40,303</span>
                <span>texts consumed</span>
            </div>           
     </div>
    </div>
</template>

<script lang="ts" src="./avg-session-popup.ts"></script>
<style lang="scss" scoped src="./avg-session-popup.scss"></style>