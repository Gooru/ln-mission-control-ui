<template>
    <div id="competency-matrix-container">
        <div class="subject-competency-panel">
            <div class="subject-competency-panel-heading">
                <h4 class="subject-competency-panel-title">Gussie's Complete Skyline</h4>
                <span class="subject-competency-panel-subtitle">Each bar represents a subject within the relevant Category</span>
            </div>
            <div class="subject-competency-panel-filter">
                <competency-matrix-filter />
            </div>
            <div class="subject-competency-matrix-chart">
                <gussie-charts/>
            </div>
        </div>
    </div>
    
</template>
<script lang="ts" src="./learners-competency-matrix.ts"></script>
<style lang="scss" src="./learners-competency-matrix.scss"></style>