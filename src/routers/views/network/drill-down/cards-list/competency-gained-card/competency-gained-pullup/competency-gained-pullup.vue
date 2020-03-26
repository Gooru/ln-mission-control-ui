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
                        <li v-for="(subject, subjectIndex) in subjectsList" :class="subject.isActive ? 'active': ''" :key="subjectIndex" @click="onSelectSubject(subject)">{{subject.framework}} / {{subject.name}}</li>
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
                        :data ="averageDount"
                        title="Monthly Average"
                         :count="totalPerformance+ '%'" />
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
                             <span @click="levelBack" v-if="!isFirstBreadCrumb"><material-icon icon="arrow_upward" /></span>  
                             {{navCurrentName}} of {{navFromName}}
                         </div>
                    </div>
                    <div class="country-progress-bar" v-if="subjectsList.length && performanceData.length">
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
                           <div class="performance-bar-body" v-for="(level, levelIndex) in performanceData" :key="levelIndex" v-on="level.type ? {click: () => onSelectLevel(level)} : {}">
                                <div class="performance-list-body">
                                    {{level.name}}
                                </div>
                                <div class="performance-bar-chart-body">
                                    <div class="bar-percentage">{{Math.round(level.performance)}}%</div>
                                    <performance-bar :totalWidth="[level.performance+'%']" :color="[performanceColor(level.performance)]"/>
                                </div>
                           </div>
                           
                        </div>
                        <div class="mastery-bar">
                            <div class="mastery-header">
                                Competency Mastery
                            </div>
                            <div class="mastery-body" v-for="(level, levelIndex) in performanceData" :key="levelIndex">
                                <performance-bar :totalWidth ="[getPercentage(level).inprogress, getPercentage(level).completed]" :color="['#2070b9','#2070b9']"/>
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
                         :count="competencyDount[0].value" 
                         title="Competency Mastered"/>
                    </div>
                    <div class="progress-bar-right">
                        <div class="mastery-bar">
                            <span :style="{'right': '0', 'top': '-10px', color: '#2070b9'}"> {{progressPercent.completed}} mastered</span>
                            <performance-bar :totalWidth ="[progressPercent.completed]" :color="['#2070b9']"/>
                        </div>
                        <div class="progress-current">
                            <span :style="{'right': '10%', 'top': '-10px', color: '#7ccff7'}">{{progressPercent.inprogress}}  Progress</span>
                            <performance-bar :totalWidth ="[progressPercent.progress, progressPercent.completed]" :color="['#2070b9','#7ccff7']"/>
                        </div>
                        <div class="not-started">
                            <span :style="{'left': '0', 'top': '-10px', color: '#959a9e'}">{{progressPercent.notStarted}} Not Started</span>
                            <performance-bar :totalWidth ="[progressPercent.progress, progressPercent.completed]" :color="['#fff','#fff']"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    </div>
</template>

<script lang="ts" src="./competency-gained-pullup.ts"></script>
<style lang="scss" scoped src="./competency-gained-pullup.scss"></style>