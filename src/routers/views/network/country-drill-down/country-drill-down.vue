<template>
    <div id="texas-container">
        <div class="texas-charts-with-district">
        <div class="country-month-picker">
            <div class="country-header">
                <div class="back-button" @click="backButton">
                    <material-icon icon="arrow_back"/>
                </div>
                <div class="profile-heading">
                    {{countryData.name}}
                </div>
            </div>
            <div class="country-month">
                <month-picker v-on:onChageTimeline="onChageTimeline"/>
            </div>
        </div>
           <div class="chart-top">
                <div class="texas-chart">
                    <texas-chart v-if="isLoaded" :breadcrumb="breadcrumb" v-on:onBack ="onBack" v-on:onChangeBreadcrumb="onSelectLevel" :dataList="competencyData" :seletedLevel ="seletedLevel"/>
                </div>
                <div class="texas-district">
                    <texas-district-card v-if="isLoaded && (competencyData.drilldown.length || competencyData.length)" v-on:onSelectLevel="onSelectLevel" :dataList="competencyData"/>
                </div>
           </div>
           <div class="texas-performance-cards">
                 <texas-card-list v-if="isLoaded" :selectedDate="selectedDate" :subjectsList="subjectsList" :countryData="countryData" :competencyData = "competencyData"/>
           </div>
        </div>
        <div class="texas-performance-by-grade" v-if="hideProperty">
           <texas-grade-list />
        </div>
    </div>
</template>

<script lang="ts" src="./country-drill-down.ts"></script>
<style lang="scss" scoped src="./country-drill-down.scss"></style>