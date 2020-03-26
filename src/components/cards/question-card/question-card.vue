<template>
  <div id="question-card">
    <div class="card-panel-container">
  <div :class="['card-panel-header', question.subFormat]">
    <div class="info">
      <div class="title">{{question.title}}</div>
    </div>
  </div>
  <div class="question-format-container">
    <span>{{question.subformat | contentFormator('question')}}</span>
      <div class="visibility  visible_false" v-if="!question.isVisibleOnProfile">
        <material-icon icon="visibility"/>
      </div>

      <div class="visibility visible_true" v-else>
        <material-icon icon="visibility"/>
      </div>

  </div>
  <div class="question-info-container">
    <div class="question-user-info">
      <div class="created-by">{{question.creator.usernameDisplay}}</div>
      <div class="img-container pull-left">
        <img class="img-responsive"  :src="question.creator.profileImage" >
      </div>
      <div class="username">{{question.creator.usernameDisplay}}</div>
    </div>
    <div class="question-description" v-html="question.description">
      {{question.description}}
    </div>
    <div class="question-standards ">
      <taxonomy-card 
          v-if="tags.length"
          visibleTags=1
          :taxonomyList="tags"
           />
    </div>

  </div>
  <div class="card-panel-footer">
    <div class="buttons-container">
      <!-- <div class="play-btn" title="Play" data-toggle="tooltip" data-placement="right" {{action "onPlayQuestion" question.id}}>{{gru-icon name="ic_play_arrow"}}</div> -->
    </div>
    <div class="question-prefs-container">
      <span class="left-arc"></span>
      <span class="right-arc"></span>
      <div class="question-prefs relevance pull-left" :style="{'background-color':'rgba(0, 114, 188, '+ question.relevance +' )'}">
        <div class="count">{{question.relevance}}</div>
        <div class="title">{{$t('common.relevance')}}</div>
      </div>
      <div class="question-prefs engagement pull-left" :style="{'background-color':'rgba(0, 114, 188, '+ question.engagement +' )'}">
        <div class="count">{{question.engagement}}</div>
        <div class="title">{{$t('common.engagement')}}</div>
      </div>
      <div class="question-prefs efficacy pull-left" :style="{'background-color':'rgba(0, 114, 188, '+ question.efficacy +' )'}">
        <div class="count">{{question.efficacy}}</div>
        <div class="title">{{$t('common.efficacy')}}</div>
      </div>
    </div>
  </div>
</div>
  </div>
</template>

<script lang="ts" src="./question-card.ts"></script>
<style lang="scss" src="./question-card.scss"></style>
