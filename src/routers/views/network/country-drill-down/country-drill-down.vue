<template>
    <div id="texas-container">
        <div class="texas-charts-with-district">
           <div class="chart-top">
                <div class="texas-chart">
                    <texas-chart v-if="isLoaded" :breadcrumb="breadcrumb" v-on:onChangeBreadcrumb="onSelectLevel" :dataList="stateList" :cardTitle ="countryName"/>
                </div>
                <div class="texas-district">
                    <texas-district-card v-if="isLoaded" v-on:onSelectLevel="onSelectLevel" :dataList="stateList"/>
                </div>
           </div>
           <div class="texas-performance-cards">
                 <texas-card-list v-if="isLoaded" :dataList="stateList"/>
           </div>
        </div>
        <div class="texas-performance-by-grade">
           <texas-grade-list />
        </div>
    </div>
</template>

<script lang="ts" src="./country-drill-down.ts"></script>
<style lang="scss" scoped src="./country-drill-down.scss"></style>