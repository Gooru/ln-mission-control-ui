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
           <div class="chart-top"  v-if="isLoaded" >
                <div class="texas-chart">
                    <level-chart 
                    :studentList="studentList" 
                    :countryData="countryData"  
                    :breadcrumb="breadcrumb" 
                    v-on:onBack ="onBack" 
                    v-on:onChangeBreadcrumb="onSelectLevel" 
                    :dataList="competencyData" 
                    :seletedLevel ="seletedLevel"/>
                </div>
                <div class="texas-district">
                    <level-card 
                    :studentList="studentList"
                    v-on:onSelectLevel="onSelectLevel" 
                    :dataList="competencyData"/>
                </div>
           </div>
           <div class="texas-performance-cards">
                 <card-list 
                  v-if="isLoaded"
                  :studentList="studentList"
                  :seletedLevel="seletedLevel"
                  :selectedDate="selectedDate" 
                  :subjectsList="subjectsList" 
                  :countryData="countryData" 
                  :competencyData ="competencyData"
                  :cardDetails="cardDetails"/>
           </div>
        </div>
        <div class="texas-performance-by-grade" v-if="hideProperty">
           <texas-grade-list />
        </div>
    </div>
</template>

<script lang="ts" src="./drill-down.ts"></script>
<style lang="scss" scoped src="./drill-down.scss"></style>