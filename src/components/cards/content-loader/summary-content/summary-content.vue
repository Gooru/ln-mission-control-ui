<template>
    <div class="summary-content">
        <div class="summary-resource-question">
            <div class="summary-chart-contianer">
                 <summary-chart :data="summaryResources" width="400" height="350" radius="135" innerRadius="120" radius1="110" innerRadius1="100"  label="resource"/>
                 <summary-chart :data="summaryQuestions" width="400" height="350" radius="115" innerRadius="100" radius1="90" innerRadius1="80"  label="question"/>
            </div>
            <div class="summary-chart-footer">
                 <div v-for="(item, index) in summaryCatalogFooter" :key="index" class="footer-icon"><mc-icon :icon="item.type+'-gray'"/>  {{Object.keys(learnerContent).length ? learnerContent[item.type].totalHitCount : ''}}</div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./summary-content.ts"></script>
<style lang="scss" src="./summary-content.scss"></style>