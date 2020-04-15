<template>
  <div id="course-card">
    <div class="card-panel-container">
  <div class="card-panel-header" :style="{'background-image': 'url(' + course.thumbnailUrl + ')'}">
    <div class="info">
      <div class="title">{{course.title}}</div>
    </div>
  </div>
  <div class="unit-count-container">
    <i class="icon"></i>
    <span>{{course.unitCount}}</span>
  </div>
  <div class="course-info-container">
    <div class="course-user-info">
      <div class="created-by">{{course.creator ? course.creator.usernameDisplay : course.owner.username}}</div>
      <div class="img-container pull-left">
        <img class="img-responsive"  :src=" course.creator ? course.creator.profileImage : course.owner.avatarUrl" >
      </div>
      <div class="username">{{course.creator ? course.creator.usernameDisplay : course.owner.username}}</div>
    </div>
    <div class="course-description" v-html="course.description">
      {{course.description}}
    </div>
    <div class="course-standards ">
      <taxonomy-card 
          v-if="tags.length"
          visibleTags=1
          :taxonomyList="tags"
           />
    </div>

  </div>
    <div class="panel-footer-container" v-if="isHideCoursePerf"> 
      <!-- <div class="actions-container">
        <div class="left-aligned">
          <div class="play-btn action-btn" title="Play" data-toggle="tooltip" data-placement="right" {{action "onPlayCourse" course.id}}>{{gru-icon name="play_arrow"}}</div>
        </div>
        <div class="right-aligned">
          <div class="edit-btn action-btn" title="Remix" data-toggle="tooltip" data-placement="right" {{action "onRemixCourse" course.id}}>{{gru-icon name="create"}}</div>
          <div class="edit-btn action-btn" title="Add" data-toggle="tooltip" data-placement="right" {{action "onAddCourse" course.id}}>{{gru-icon name="add"}}</div>
        </div>
      </div> -->
    </div>
    <div class="card-panel-footer" v-else>
      <div class="buttons-container">
        <!-- <div class="play-btn" title="Play" data-toggle="tooltip" data-placement="right" {{action "onPlayCourse" course.id}}>{{gru-icon name="ic_play_arrow"}}</div> -->
      </div>
      <div class="course-prefs-container">
        <span class="left-arc"></span>
        <span class="right-arc"></span>
        <div class="course-prefs relevance pull-left" :style="{'background-color':'rgba(0, 114, 188, '+ course.relevance +' )'}">
          <div class="count">{{course.relevance}}</div>
          <div class="title">{{$t('common.relevance')}}</div>
        </div>
        <div class="course-prefs engagement pull-left" :style="{'background-color':'rgba(0, 114, 188, '+ course.relevance +' )'}">
          <div class="count">{{course.engagement}}</div>
          <div class="title">{{$t('common.engagement')}}</div>
        </div>
        <div class="course-prefs efficacy pull-left" :style="{'background-color':'rgba(0, 114, 188, '+ course.efficacy +' )'}">
          <div class="count">{{course.efficacy}}</div>
          <div class="title">{{$t('common.efficacy')}}</div>
        </div>
      </div>
    </div>
</div>

  </div>
</template>

<script lang="ts" src="./course-card.ts"></script>
<style lang="scss" src="./course-card.scss"></style>
