<template>
    <div class="mc-competency-card">
        <div class="competency-card-container">
            <div class="competency-head">
                <div class="competency-title">
                <material-icon icon="more_horiz" />
                <div class="competency-name">
                     <span>{{activeCompetency.competencyStudentDesc}}</span>
                     <span class="competency-code">{{activeCompetency.competencyCode}}</span>
                </div>
                <span @click="onClose()" class="close-icon"><material-icon icon="close" /></span>
                </div>
                <div class="competency-description">
                     {{activeCompetency.competencyName}}
                </div>
            </div>
            <div class="competency-body">
                <div class="competency-tab-header">
                    <ul>
                        <li :class="{active: isActive }" @click="onChangeTab(true)">Meta</li>
                        <li :class="{active: !isActive }" @click="onChangeTab(false)">Learning Map</li>
                    </ul>
                </div>
                <div class="competency-list" v-if="isActive">
                    <div class="competency-dependency">
                        <div class="competency-dependency-panel">
                            <div class="dependency-panel-heading">
                                <material-icon icon="fiber_manual_record" />
                                <span>prerequisites</span>
                            </div>
                            <div class="dependancy-panel-body" v-if="prerequisites.length">
                                <div class="dependency-panel-card" v-for="(prerequisite, index) in prerequisites" :key="index">
                                    <material-icon icon="more_horiz" />
                                    <div class="dep-competency-name">
                                        <span class="dep-competency-title">
                                            {{prerequisite.title}}
                                        </span>
                                        <span class="dep-competency-code">
                                            {{prerequisite.code}}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Note: currently we does in have API support for compelementry edges -->
                    <div class="competency-complimentry" hidden>
                        <div class="competency-complimentry-panel">
                            <div class="competency-complimentry-heading">
                                <material-icon icon="fiber_manual_record" />
                                <span>complimentry edges</span>
                            </div>
                            <div class="competency-complimentry-body">
                                <div class="competency-complimentry-panel">
                                    <div class="complimentry-panel-card">
                                        <material-icon icon="fiber_manual_record" />
                                        <div class="compli-competency-name">
                                            <span class="compli-competency-title">
                                                competency name
                                            </span>
                                            <span class="compli-competency-code">
                                                1.EEE.2
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="competency-micro">
                        <div class="competency-micro-panel">
                            <div class="competency-micro-heading">
                                 <span class="micro-icon"></span>
                                <span>Micro-Competencies</span>
                            </div>
                            <div class="competency-micro-body">
                                <div class="competency-micro-panel" v-if="microCompetency">
                                    <div class="micro-panel-card" v-for="(competency , competencyIndex) in microCompetency" :key="competencyIndex">
                                        <span class="micro-icon"></span>
                                        <div class="micro-competency-name">
                                            <span class="micro-competency-title">
                                                {{competency.title}}
                                            </span>
                                            <span class="micro-competency-code">
                                                {{competency.code}}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="learning-map-tap" v-if="!isActive">
                    <div class="learning-map-container" v-if="learningMapContent">
                         <div class="coures-content" v-for="(collection, keys, index) in learningMapContent.totalCounts" @click="onSelectContent(keys)" :key="index">
                             <span class="icon"><mc-icon :icon="keys + '-gray'" /></span>
                             <span>{{collection}}</span>
                         </div>
                    </div>
                     <div class="signature-content-section">
                            <h4 class="collection-title signature-content-title">SIGNATURE COLLECTIONS</h4>
                             <div v-if="signatureCollection.length">
                              <div class="signature-panel" v-for="(collection, collectionIndex) in signatureCollection" :key="collectionIndex">
                                    <div class="thumbnail-img"><img :src="collection.thumbnailUrl"></div>
                                    <div class="signature-title">{{collection.title}}</div>
                             </div>
                             </div>
                             <div v-else> There is no signature collection.</div>
                             <h4 class="assessment-title signature-content-title">SIGNATURE ASSESSMENTS</h4>
                             <div v-if="signatureAssessment.length">
                                    <div class="signature-panel" v-for="(assessment, assessmentIndex) in signatureAssessment" :key="assessmentIndex">
                                    <div class="thumbnail-img"><img :src="assessment.thumbnailUrl"></div>
                                    <div class="signature-title">{{assessment.title}}</div>
                                    </div>
                             </div>
                             <div v-else>There is no signature assessment.</div>
                             
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" src="./competency-card.ts"></script>
<style lang="scss"scoped src="./competency-card.scss"></style>