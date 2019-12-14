<template>
    <div>
        <div id="texas_chart">
             <div class="line-chart-tooltip" v-if="tooltipData" :style="{left: tooltipStyle.toolX + 'px', top: tooltipStyle.toolY + 'px'}">
            {{tooltipData.competency_count}}
        </div>
        </div>
    </div>
</template>
<script lang="ts" src="./texas-line-chart.ts"></script>
<style lang="scss" src="./texas-line-chart.scss"></style>