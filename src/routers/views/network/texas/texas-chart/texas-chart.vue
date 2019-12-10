<template>
    <div id="texas-chart-container">
        <div class="texas-header">
            <div class="texas-title">
                 <material-icon icon="arrow_back" />
                 <h5 class="texas-title-head">Texas</h5>
            </div>
            <div class="texas-pullup-table">
                <material-icon icon="bar_chart" />
            </div>
            <div class="texas-nav-tab">

            </div>
        </div>
       <div class="chart-container">
        <div class="chart-totals">
            <div class="competency-total">
                 <h4 class="total-counts">12,302</h4>
                 <span>Competencies Gained</span>
            </div>
            <div class="competenc-from">
                <h4 class="perfomance-avarage"><material-icon icon="arrow_downward" /> 8.0%</h4>
                <span>Since last month</span>
            </div>
        </div>
           <texas-line-chart />
       </div>
    </div>
</template>

<script lang="ts" src="./texas-chart.ts"></script>
<style lang="scss" scoped src="./texas-chart.scss"></style>