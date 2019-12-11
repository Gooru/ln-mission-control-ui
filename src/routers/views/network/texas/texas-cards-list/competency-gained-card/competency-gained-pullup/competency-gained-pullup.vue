<template>
    <div id="competency-gained-pullup-container">
        <div class="backdrop"></div>
        <div class="performance-and-competency-panel">
            <div class="performance-competency-panel-heading">
                <div class="performance-top-header">
                    <div class="competency-back" @click="onGoBack">
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
                        <li>Economics</li>
                        <li>ela</li>
                        <li>philosophy</li>
                        <li>chemistry</li>
                        <li>social studies</li>
                    </ul>
                </div>
            </div>
            <div class="performance-competency-panel-body">
                <div class="panel-body-left-section">
                    <div class="dount-chart-left">
                        <dount-chart width="200" 
                        height="200" 
                        diff="23" 
                        margin="20" 
                        count="75%" 
                        title="Monthly Avarage"
                        :data ="data"/>
                        <div class="dount-chart-title">
                            <span>Avg. Performance</span>
                        </div>
                    </div>
                    <div class="top-activity">
                        <div class="top-activity-last-month">
                            <h4 class="activity-percentage"><material-icon icon="arrow_downward" /> 8.9%</h4>
                            <span>Since last month</span>
                        </div>
                        <div class="activity-body">
                            <span class="percent-icon">%</span>
                            <span class="activity-title">Top Activity</span>
                            <div class="activity-footer">
                                <span class="footer-title">Signature Assessments</span>
                                <span class="counts">(43,029 Conducted)</span>
                            </div>
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
                        <dount-chart
                         width="200"
                         height="200" 
                         diff="23" 
                         margin="20" 
                         :data ="data1"
                         count="23,223" 
                         title="Competency Mastered"/>
                    </div>
                    <div class="progress-bar-right">
                        <div class="mastery-bar">
                            <span :style="{'right': '0', 'top': '-10px', color: '#2070b9'}">64% mastered</span>
                            <performance-bar progressWidth="50%" backgroundColor="#2070b9" />
                        </div>
                        <div class="progress-current">
                            <span :style="{'right': '10%', 'top': '-10px', color: '#7ccff7'}">10% Progress</span>
                            <performance-bar progressWidth="50%" backgroundColor="#fff" progressWidth1="10%" backgroundColor1="#7ccff7"/>
                        </div>
                        <div class="not-started">
                            <span :style="{'left': '0', 'top': '-10px', color: '#959a9e'}">40% Not Started</span>
                            <performance-bar progressWidth="50%" backgroundColor="#fff" progressWidth1="10%" backgroundColor1="#fff"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    </div>
</template>

<script lang="ts" src="./competency-gained-pullup.ts"></script>
<style lang="scss" scoped src="./competency-gained-pullup.scss"></style>