<template>
   <div id="lesson-card">
     <div class="card-panel-container">
  <div :class="['card-panel-header', lesson.contentSubFormat]">
    <div class="info">
      <div class="title">{{lesson.title}}</div>
    </div>
  </div>
  <div class="lesson-format-container">
    <div class="assessment pull-left">
      <i class="icon"></i>
      <span>{{lesson.assessmentCount}}</span>
    </div>
    <div class="collection pull-left">
      <i class="icon"></i>
      <span>{{lesson.collectionCount}}</span>
    </div>
  </div>
  <div class="lesson-info-container">
    <div class="lesson-user-info">
      <div class="created-by">{{lesson.creator.usernameDisplay}}</div>
      <div class="img-container pull-left">
        <img class="img-responsive"  :src="lesson.creator.profileImage" >
      </div>
      <div class="username">{{lesson.creator.usernameDisplay}}</div>
    </div>
    <div class="lesson-description" v-html="lesson.description">
      {{lesson.description}}
    </div>
    <div class="lesson-standards ">
      <taxonomy-card 
          v-if="tags.length"
          visibleTags=1
          :taxonomyList="tags"
           />
    </div>

  </div>
  <div class="card-panel-footer">
    <div class="lesson-prefs-container">
      <span class="left-arc"></span>
      <span class="right-arc"></span>
      <div class="lesson-prefs relevance pull-left" :style="{'background-color':'rgba(0, 114, 188, '+ lesson.relevance +' )'}">
        <div class="count">{{lesson.relevance}}</div>
        <div class="title">{{$t('common.relevance')}}</div>
      </div>
      <div class="lesson-prefs engagement pull-left" :style="{'background-color':'rgba(0, 114, 188, '+ lesson.relevance +' )'}">
        <div class="count">{{lesson.engagement}}</div>
        <div class="title">{{$t('common.engagement')}}</div>
      </div>
      <div class="lesson-prefs efficacy pull-left" :style="{'background-color':'rgba(0, 114, 188, '+ lesson.relevance +' )'}">
        <div class="count">{{lesson.efficacy}}</div>
        <div class="title">{{$t('common.efficacy')}}</div>
      </div>
    </div>
  </div>
</div>

   </div>
</template>

<script lang="ts" src="./lesson-card.ts"></script>
<style lang="scss" src="./lesson-card.scss"></style>
