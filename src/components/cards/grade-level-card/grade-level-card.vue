<template>
    <div class="mc-grade-level-card">
        <div class="grade-level-card-container">
            <div class="grade-header">
               <div class="grade-title">
                   <span>level</span>
                    <span class="grade-name">{{activeGrade.grade}}</span>
               </div>
               <span  @click="onClose()"><material-icon icon="close"/></span>
            </div>
            <div class="grade-competency-container">
                    <div class="grade-description" v-html="activeGrade.description">
                        {{activeGrade.description}}
                    </div>
                    <div class="competency-panel">
                        <h4 class="competency-heading">Competencies</h4>
                        <div class="competency-list">      
                            <div class="competency-card" v-for="(competency, index) in gradeCompetency" :key="index">
                                <div class="competency-header">
                                    <span class="competency-code">{{competency.competencyCode}}</span>
                                    <span class="competency-title">{{competency.competencyStudentDesc}}</span>
                                </div>
                                <div class="competency-footer">
                                    {{competency.competencyName}}
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" src="./grade-level-card.ts"></script>
<style lang="scss" scoped src="./grade-level-card.scss"></style>