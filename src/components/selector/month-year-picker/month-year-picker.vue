<template>
  <div id="month-year-picker">
    <div class="year-selector">
      <div class="active-year" @click="isShowYearDropdown = !isShowYearDropdown">{{formatYear(activeYear)}} <google-material-icon :icon="isShowYearDropdown ? 'keyboard_arrow_up' : 'keyboard_arrow_downn'" /></div>
      <div v-if="isShowYearDropdown" class="year-dropdown">
        <span class="year-val" :class="{active: activeYear === year}" v-for="(year, index) in yearList" :key="index" @click="onSelectYear(year)">{{formatYear(year)}}</span>
      </div>
    </div>
    <div class="load-month prev-load" @click="onPopulateMonth('left')">
      <google-material-icon icon='keyboard_arrow_left' />
    </div>
    <div class="month-year-items">
      <div class="month-year-item" :class="{active: activeDate == date}" v-for="(date, index) in dateRangeList" :key="index" @click="onSelectMonthYear(date)">
        <div class="month">{{formatMonth(date)}}</div>
        <div class="year">{{formatYear(date)}}</div>
      </div>
    </div>
    <div class="load-month next-load" :class="{disabled: endDate >= currentMonth}" @click="onPopulateMonth('right')">
      <google-material-icon icon='keyboard_arrow_right' />
    </div>
  </div>
</template>

<script lang="ts" src="./month-year-picker.ts"></script>
<style lang="scss" scoped src="./month-year-picker.scss"></style>
