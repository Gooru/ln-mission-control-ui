<template>
    <div id="performance-by-grade-container">
        <div class="performance-by-grade-panel">
            <div class="grade-panel-header">
                <div class="grade-dropdown">
                    <span>Performance by</span>
                    <div class="grade-selection">
                        Grade 
                        <material-icon icon="arrow_drop_down" />
                    </div>
                </div>
                <div class="grade-percentage">
                    75<span>%</span>
                </div>
            </div>
            <div class="grade-panel-body" v-for="(list, listIndex) in itrate" :key="listIndex">
                <div class="grade-count-list">
                   <span>{{listIndex + 1}}</span>
                </div>
                <div class="grade-name-list">
                    <h4 class="grade-title">
                        {{listIndex + 1}}<small>{{listIndex === 0 ? 'st': 'th' && listIndex === 1 ? 'nd': 'th' && listIndex === 2 ? 'rd': 'th'}}</small> Grade
                    </h4>
                    <ul class="grade-sub-title">
                        <li><material-icon icon="trending_up" /></li>
                        <li>28%</li>
                    </ul>
                </div>
                <div class="grade-percentage-list">
                    <h4 class="grade-percentage">75 <span>%</span></h4>
                    <span class="grade-avarage-title">Avarage</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./performance-by-grade.ts"></script>
<style lang="scss" src="./performance-by-grade.scss"></style>