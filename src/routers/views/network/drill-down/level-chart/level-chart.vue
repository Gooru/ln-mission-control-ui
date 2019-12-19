<template>
    <div id="texas-chart-container">
        <div class="texas-header">
            <div :class="['texas-title', breadcrumb.length ? '' : 'on-breadcrumb']">
                 <span v-on="breadcrumb.length ? {click :onBack} : {}"><material-icon icon="arrow_back"/></span>
                 <h5 class="texas-title-head">{{breadcrumb.length ? seletedLevel.name : countryData.name}}</h5>
            </div>
            <div class="texas-pullup-table">
                <material-icon icon="bar_chart" />
            </div>
            <div class="texas-nav-tab">
                <ul class="texas-breadcrumb" v-if="breadcrumb">
                    <li v-for="(list, navIndex) in breadcrumb" :key="navIndex" @click="onChangeBreadcrumb(list)">{{list.name}} <span> > </span></li>
                </ul>
            </div>
        </div>
       <div class="chart-container">
        <div class="chart-totals">
            <div class="competency-total">
                 <h4 class="total-counts">{{totalCompetencyGained}}</h4>
                 <span>Competencies Gained</span>
            </div>
            <div class="competenc-from" v-if="hideScore">
                <h4 class="perfomance-avarage"><material-icon icon="arrow_downward" /> 8.0%</h4>
                <span>Since last month</span>
            </div>
        </div>
           <line-chart v-if="seletedLevel.type !== 'class' && dataList" :dataList="chartData"/>
           <atc-view v-if="seletedLevel.type === 'class' && studentList" :dataList="studentList"/>
       </div>
    </div>
</template>

<script lang="ts" src="./level-chart.ts"></script>
<style lang="scss" scoped src="./level-chart.scss"></style>