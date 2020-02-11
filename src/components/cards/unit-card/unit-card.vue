<template>
    <div id="unit-card">
        <div class="card-panel-container">
  <div :class="['card-panel-header', unit.contentSubFormat]">
    <div class="info">
      <div class="title">{{unit.title}}</div>
    </div>
  </div>
  <div class="unit-format-container">
    <div class="assessment pull-left">
      <i class="icon"></i>
      <span>{{unit.assessmentCount}}</span>
    </div>
    <div class="collection pull-left">
      <i class="icon"></i>
      <span>{{unit.collectionCount}}</span>
    </div>
  </div>
  <div class="unit-info-container">
    <div class="unit-user-info">
      <div class="created-by"></div>
      <div class="img-container pull-left">
        <img class="img-responsive">
      </div>
      <div class="username"></div>
    </div>
    <div class="unit-description">
      {{unit.description}}
    </div>
    <div class="unit-standards ">
      <!-- {{#if tags.length}}
        {{taxonomy/gru-taxonomy-tag-list tags=tags tagsVisible=1 isInCard=true showDescription=true}}
      {{/if}} -->
    </div>

  </div>
  <div class="card-panel-footer">
    <div class="unit-prefs-container">
       <span class="left-arc"></span>
      <span class="right-arc"></span>
      <div class="unit-prefs relevance pull-left" :style="{'background-color':'rgba(0, 114, 188, '+ collection.relevance +' )'}">
        <div class="count">{{collection.relevance}}</div>
        <div class="title">{{$t('common.relevance')}}</div>
      </div>
      <div class="unit-prefs engagement pull-left" :style="{'background-color':'rgba(0, 114, 188, '+ collection.engagement +' )'}">
        <div class="count">{{collection.engagement}}</div>
        <div class="title">{{$t('common.engagement')}}</div>
      </div>
      <div class="unit-prefs efficacy pull-left" :style="{'background-color':'rgba(0, 114, 188, '+ collection.efficacy +' )'}">
        <div class="count">{{collection.efficacy}}</div>
        <div class="title">{{$t('common.efficacy')}}</div>
      </div>
    </div>
  </div>
</div>

    </div>
</template>

<script lang="ts" src="./unit-card.ts"></script>
<style lang="scss" src="./unit-card.scss"></style>
