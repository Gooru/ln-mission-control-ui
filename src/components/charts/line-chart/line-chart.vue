<template>
    <div>
        <div id="texas_chart">
             <div class="line-chart-tooltip" id="tooltip" ref="tooltip" v-if="tooltipData" :style="{left: tooltipStyle.toolX + 'px', top: tooltipStyle.toolY + 'px'}">
            {{tooltipData}}
        </div>
        </div>
    </div>
</template>
<script lang="ts" src="./line-chart.ts"></script>
<style lang="scss" src="./line-chart.scss"></style>