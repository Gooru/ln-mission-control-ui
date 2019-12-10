<template>
    <div id="competency-gained-pullup-container">
        <div class="backdrop"></div>
        <div class="performance-and-competency-panel">
            <div class="performance-competency-panel-heading">
                <div class="performance-top-header">
                    <div class="competency-back">
                        <material-icon icon="arrow_back"/>
                        <span>Back to Dashboard</span>
                    </div>
                    <h4 class="competency-title">
                        Performance & Competency Gains
                    </h4>
                </div>
                <div class="performance-nav-tab-panel">
                    <ul class="nav-tab-list-blk">
                        <li class="active">All</li>
                        <li>Math</li>
                        <li>Physics</li>
                        <li>ela</li>
                    </ul>
                </div>
            </div>
            <div class="performance-competency-panel-body">
                <div class="panel-body-left-section">
                    <div class="dount-chart-left">
                        <dount-chart width="200" height="200" diff="23" margin="20" count="75%" title="Monthly Avarage"/>
                        <div class="dount-chart-title">
                            <span>Avg. Performance</span>
                        </div>
                    </div>

                </div>
                <div class="panel-body-center-section">
                    <div class="country-header">
                        State of Texas
                    </div>
                    <div class="country-progress-bar">
                        <div class="performance-bar">
                           <div class="performance-bar-header">
                                <div class="performance-list-header">
                                    Districts
                                    <material-icon icon="search"/>
                                </div>
                                <div class="performance-bar-chart-header">
                                    Performance
                                </div>
                           </div>
                           <div class="performance-bar-body" v-for="list in itrate" :key="list">
                                <div class="performance-list-body">
                                    sundown school district
                                </div>
                                <div class="performance-bar-chart-body">
                                    <div class="bar-percentage">{{list}}</div>
                                    <performance-bar :progressWidth="list" backgroundColor="#5b8f42"/>
                                </div>
                           </div>
                           
                        </div>
                        <div class="mastery-bar">
                            <div class="mastery-header">
                                Competency Mastery
                            </div>
                            <div class="mastery-body"  v-for="list in itrate" :key="list">
                                <performance-bar progressWidth="50%" backgroundColor="#2070b9" progressWidth1="10%" backgroundColor1="#7ccff7"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="panel-body-right-section">
                     <div class="dount-chart-right">
                        <dount-chart width="200" height="200" diff="23" margin="20" count="23,223" title="Monthly Avarage"/>
                    </div>
                </div>
            </div>
        </div>
        
    </div>
</template>

<script lang="ts" src="./competency-gained-pullup.ts"></script>
<style lang="scss" scoped src="./competency-gained-pullup.scss"></style>