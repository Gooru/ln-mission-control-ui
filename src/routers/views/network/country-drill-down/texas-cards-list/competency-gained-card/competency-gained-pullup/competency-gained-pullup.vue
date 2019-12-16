<template>
    <div id="competency-gained-pullup-container">
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
                    <ul class="nav-tab-list-blk" v-if="subjectsList.length">
                        <li v-for="(subject, subjectIndex) in subjectsList" :key="subjectIndex">{{subject.framework}} / {{subject.name}}</li>
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
                        :count="perfromanceAverage + '%'" 
                        title="Monthly Average"
                        :data ="averageDount"/>
                        <div class="dount-chart-title" v-if="hideDiv">
                            <span>Avg. Performance</span>
                        </div>
                    </div>
                    <div class="top-activity" v-if="hideDiv">
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
                         <div class="country-header-container">
                             <span @click="levelBack"><material-icon icon="arrow_upward" /></span>  State of Texas
                         </div>
                    </div>
                    <div class="country-progress-bar">
                        <div class="performance-bar">
                           <div class="performance-bar-header">
                                <div class="performance-list-header">
                                    {{level}}
                                    <material-icon icon="search"/>
                                </div>
                                <div class="performance-bar-chart-header">
                                    Performance
                                </div>
                           </div>
                           <div class="performance-bar-body" v-for="(level, levelIndex) in dataList.data" :key="levelIndex" v-on="level.type !== 'class' ? {click: () => onSelectLevel(level)} : {}">
                                <div class="performance-list-body">
                                    {{level.name}}
                                </div>
                                <div class="performance-bar-chart-body">
                                    <div class="bar-percentage">{{level.performance}}%</div>
                                    <performance-bar :totalWidth="[level.performance+'%']" :color="[performanceColor(level.performance)]"/>
                                </div>
                           </div>
                           
                        </div>
                        <div class="mastery-bar">
                            <div class="mastery-header">
                                Competency Mastery
                            </div>
                            <div class="mastery-body" v-for="(level, levelIndex) in dataList.data" :key="levelIndex">
                                <performance-bar :totalWidth ="[level.inprogressCompetencies+'%',level.completedCompetencies+'%']" :color="['#2070b9','#7ccff7']"/>
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
                         :data ="competencyDount"
                         :count="competencyGained" 
                         title="Competency Mastered"/>
                    </div>
                    <div class="progress-bar-right">
                        <div class="mastery-bar">
                            <span :style="{'right': '0', 'top': '-10px', color: '#2070b9'}">64% mastered</span>
                            <performance-bar :totalWidth ="['50%']" :color="['#2070b9']"/>
                        </div>
                        <div class="progress-current">
                            <span :style="{'right': '10%', 'top': '-10px', color: '#7ccff7'}">10% Progress</span>
                            <performance-bar :totalWidth ="['50%','10%']" :color="['#2070b9','#7ccff7']"/>
                        </div>
                        <div class="not-started">
                            <span :style="{'left': '0', 'top': '-10px', color: '#959a9e'}">40% Not Started</span>
                            <performance-bar :totalWidth ="['50%','10%']" :color="['#fff','#fff']"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    </div>
</template>

<script lang="ts" src="./competency-gained-pullup.ts"></script>
<style lang="scss" scoped src="./competency-gained-pullup.scss"></style>