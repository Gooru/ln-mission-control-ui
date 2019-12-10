<template>
    <div id="texas-container">
        <div class="texas-charts-with-district">
           <div class="chart-top">
                <div class="texas-chart">
                        <texas-chart />
                </div>
                <div class="texas-district">
                        <texas-district-card />
                </div>
           </div>
           <div class="texas-perfomance-cards">
                 <texas-card-list/>
           </div>
        </div>
        <div class="texas-perfomance-by-grade">
           
        </div>
    </div>
</template>

<script lang="ts" src="./texas.ts"></script>
<style lang="scss" scoped src="./texas.scss"></style>