<template>
<transition name="fade">
  <div id="nav-learning-worldwide-popover">
    <div id="country-name-container">
      <p id="country-name">{{country.properties.name}}</p>
    </div>
    <div id="student-data-container">
      <div class="category-header">
        {{ $tc('student', 2) }}
      </div>
      <div id="student-body-container">
        <div id="active-students-container">
          <span class="title">{{$t('active')}} {{$tc('student', 2)}}</span>
          <google-material-icon class="icon" icon="account_circle" />
          <span class="count">{{numberFormat(country.active_student)}}</span>
        </div>
        <div id="competencies-gained-container">
          <span class="title">{{$t('competencies')}} {{$t('gained')}}</span>
          <i class="competencies-gained-icon" />
          <span class="count">{{numberFormat(country.competencies_gained)}}</span>
        </div>
        <div id="total-timespent-container">
          <span class="title">{{$t('total')}} {{$t('time')}}&nbsp;{{$t('spent')}}</span>
          <google-material-icon class="icon" icon="schedule" />
          <span class="count">{{numberFormat(country.total_timespent)}}</span>
        </div>
      </div>
    </div>
    <div id="teacher-data-container">
      <div class="category-header">
        {{ $tc('teacher', 2) }}
      </div>
      <div id="teacher-body-container">
        <div id="active-classrooms-container">
          <span class="title">{{$t('active')}} {{$tc('classroom', 2)}}</span>
          <font-awesome-icon icon="fa-chalkboard-teacher" />
          <span class="count">{{numberFormat(country.active_classroom)}}</span>
        </div>
        <div id="activities-conducted-container">
          <span class="title">{{$tc('activity', 2)}} {{$t('conducted')}}</span>
          <font-awesome-icon icon="fa-thumbtack" />
          <span class="count">{{numberFormat(country.activities_conducted)}}</span>
        </div>
        <div id="nav-courses-container">
          <span class="title">{{$t('navigator')}} {{$tc('course', 2)}}</span>
          <google-material-icon class="icon" icon="navigation" />
          <span class="count">{{numberFormat(country.navigator_courses)}}</span>
        </div>
      </div>
    </div>
  </div>
</transition>
</template>
<script lang="ts" src="./nav-learning-worldwide-popover.ts"></script>
<style lang="scss" scope  src="./nav-learning-worldwide-popover.scss"></style>
