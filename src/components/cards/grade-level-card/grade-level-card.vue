<template>
    <div class="mc-grade-level-card">
        <div class="grade-level-card-container">
            <div class="grade-header">
               <div class="grade-title">
                   <span>level</span>
                    <span class="grade-name">grade</span>
               </div>
               <material-icon icon="close"/>
            </div>
            <div class="grade-competency-container">
                    <div class="grade-description">
                        description
                    </div>
                    <div class="competency-panel">
                        <h4 class="competency-heading">Competencies</h4>
                        <div class="competency-list">      
                            <div class="competency-card">
                                <div class="competency-header">
                                    <span class="competency-code">ND9-4-BD</span>
                                    <span class="competency-title">title</span>
                                </div>
                                <div class="competency-footer">
                                    description
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