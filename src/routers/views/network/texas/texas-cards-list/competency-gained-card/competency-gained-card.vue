<template>
    <div id="card-container">
        <div id="competency-gained-container" @click="isShowCompetency = !isShowCompetency">
            <div class="gained-header">
                <h4 class="gained-percentage">80 <span>%</span></h4>
                <h4 class="gained-counts">407,939</h4>
            </div>
            <div class="gained-footer">
                <span class="performance-title">Performance</span>
                <span class="competency-title">Competencies Gained</span>
            </div>
        </div>
        <div class="competency-gained-pullup" v-if="isShowCompetency">
            <competency-gained-pullup v-on:onGoBack="onGoBack"/>
        </div>
    </div>
    
</template>

<script lang="ts" src="./competency-gained-card.ts"></script>
<style lang="scss" scoped src="./competency-gained-card.scss"></style>