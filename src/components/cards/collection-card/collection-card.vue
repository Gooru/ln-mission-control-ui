<template>
    <div id="collection-card">
          <div class="card-panel-container">
  <div class="card-panel-header" :style="{'background-image': 'url(' + collection.thumbnailUrl + ')'}">
    <div class="info">
      <div class="title">{{collection.title}}</div>
    </div>
  </div>
  <div class="content-count-container">
    <div class="question pull-left">
      <i class="icon"></i>
      <span>{{collection.questionCount}}</span>
    </div>

    <div class="resource pull-left" v-if="collection.format !== 'assessment'">
      <i class="icon"></i>
      <span>{{collection.resourceCount}}</span>
    </div>
  </div>
  <div class="collection-info-container">
    <div class="collection-user-info">
      <div class="created-by"></div>
      <div class="img-container pull-left">
        <img class="img-responsive"   >
      </div>
      <div class="username">{{collection.usernameDisplay}}</div>
    </div>
    <div class="collection-description">
      {{collection.description}}
    </div>
    <div class="collection-standards ">
      <!-- {{#if tags.length}}
        {{taxonomy/gru-taxonomy-tag-list tags=tags tagsVisible=1 isInCard=true showDescription=true}}
      {{/if}} -->
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
      <div class="collection-prefs relevance pull-left" :style="{'background-color':'rgba(0, 114, 188, '+ collection.relevance +' )'}">
        <div class="count">{{collection.relevance}}</div>
        <div class="title">{{$t('common.relevance')}}</div>
      </div>
      <div class="collection-prefs engagement pull-left" :style="{'background-color':'rgba(0, 114, 188, '+ collection.engagement +' )'}">
        <div class="count">{{collection.engagement}}</div>
        <div class="title">{{$t('common.engagement')}}</div>
      </div>
      <div class="collection-prefs efficacy pull-left" :style="{'background-color':'rgba(0, 114, 188, '+ collection.efficacy +' )'}">
        <div class="count">{{collection.efficacy}}</div>
        <div class="title">{{$t('common.efficacy')}}</div>
      </div>
    </div>
  </div>
</div>
    </div>
</template>

<script lang="ts" src="./collection-card.ts"></script>
<style scoped lang="scss" src="./collection-card.scss"></style>