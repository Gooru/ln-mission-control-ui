<template>
    <div id="collection-card">
          <div class="card-panel-container">
  <div class="card-panel-header" :style="{'background-image': 'url(' + assessment.thumbnailUrl + ')'}">
    <div class="info">
      <div class="title">{{assessment.title}}</div>
    </div>
  </div>
  <div class="content-count-container">
    <div class="question pull-left">
      <i class="icon"></i>
      <span>{{assessment.questionCount}}</span>
    </div>
  </div>
  <div class="collection-info-container">
    <div class="collection-user-info">
      <div class="created-by">{{assessment.creator.usernameDisplay}}</div>
      <div class="img-container pull-left">
        <img class="img-responsive"  :src="assessment.creator.profileImage" >
      </div>
      <div class="username">{{assessment.creator.usernameDisplay}}</div>
    </div>
    <div class="collection-description" v-html="assessment.description">
      {{assessment.description}}
    </div>
    <div class="collection-standards ">
      <taxonomy-card 
          v-if="tags.length"
          visibleTags=1
          :taxonomyList="tags"
           />
    </div>

  </div>
  <div class="card-panel-footer">
    <div class="buttons-container">
      <!-- <div class="play-btn" title="Play" data-toggle="tooltip" data-placement="right" {{action "onPlayCollection" collection.id}}>{{gru-icon name="play_arrow"}}</div>
      <div class="suggest-btn" title="Suggest" data-toggle="tooltip" data-placement="left" {{action "onSuggestContent" collection}}>{{gru-icon name="explore"}}</div> -->
    </div>
    <div class="collection-prefs-container">
      <span class="left-arc"></span>
      <span class="right-arc"></span>
      <div class="collection-prefs relevance pull-left" :style="{'background-color':'rgba(0, 114, 188, '+ assessment.relevance +' )'}">
        <div class="count">{{assessment.relevance}}</div>
        <div class="title">{{$t('common.relevance')}}</div>
      </div>
      <div class="collection-prefs engagement pull-left" :style="{'background-color':'rgba(0, 114, 188, '+ assessment.engagement +' )'}">
        <div class="count">{{assessment.engagement}}</div>
        <div class="title">{{$t('common.engagement')}}</div>
      </div>
      <div class="collection-prefs efficacy pull-left" :style="{'background-color':'rgba(0, 114, 188, '+ assessment.efficacy +' )'}">
        <div class="count">{{assessment.efficacy}}</div>
        <div class="title">{{$t('common.efficacy')}}</div>
      </div>
    </div>
  </div>
</div>
    </div>
</template>

<script lang="ts" src="./assessment-card.ts"></script>
<style lang="scss" src="./assessment-card.scss"></style>