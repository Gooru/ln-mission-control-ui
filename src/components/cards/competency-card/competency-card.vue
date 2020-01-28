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
                <material-icon icon="close" />
                </div>
                <div class="competency-description">
                     {{activeCompetency.competencyName}}
                </div>
            </div>
            <div class="competency-body">
                <div class="competency-tab-header">
                    <ul>
                        <li class="active">Meta</li>
                        <li>Learning Map</li>
                    </ul>
                </div>
                <div class="competency-list">
                    <div class="competency-dependency">
                        <div class="competency-dependency-panel">
                            <div class="dependency-panel-heading">
                                <material-icon icon="fiber_manual_record" />
                                <span>dependencies</span>
                            </div>
                            <div class="dependancy-panel-body">
                                <div class="dependency-panel-card">
                                    <material-icon icon="more_horiz" />
                                    <div class="dep-competency-name">
                                        <span class="dep-competency-title">
                                            competency name
                                        </span>
                                        <span class="dep-competency-code">
                                            1.EEE.2
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="competency-complimentry">
                        <div class="competency-complimentry-panel">
                            <div class="competency-complimentry-heading">
                                <material-icon icon="fiber_manual_record" />
                                <span>complimentry edges</span>
                            </div>
                            <div class="competency-complimentry-body">

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" src="./competency-card.ts"></script>
<style lang="scss"scoped src="./competency-card.scss"></style>