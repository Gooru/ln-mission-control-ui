<template>
    <div id="unit-card">
        <div class="card-panel-container">
  <div :class="['card-panel-header', unit.format]">
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
      <div class="created-by">{{unit.creator.usernameDisplay}}</div>
      <div class="img-container pull-left">
        <img class="img-responsive"  :src="unit.creator.profileImage" >
      </div>
      <div class="username">{{unit.creator.usernameDisplay}}</div>
    </div>
    <div class="unit-description" v-html="unit.description">
      {{unit.description}}
    </div>
    <div class="unit-standards ">
       <taxonomy-card 
          v-if="tags.length"
          visibleTags=1
          :taxonomyList="tags"
           />
    </div>

  </div>
  <div class="card-panel-footer">
    <div class="unit-prefs-container">
       <span class="left-arc"></span>
      <span class="right-arc"></span>
      <div class="unit-prefs relevance pull-left" :style="{'background-color':'rgba(0, 114, 188, '+ unit.relevance +' )'}">
        <div class="count">{{unit.relevance}}</div>
        <div class="title">{{$t('common.relevance')}}</div>
      </div>
      <div class="unit-prefs engagement pull-left" :style="{'background-color':'rgba(0, 114, 188, '+ unit.engagement +' )'}">
        <div class="count">{{unit.engagement}}</div>
        <div class="title">{{$t('common.engagement')}}</div>
      </div>
      <div class="unit-prefs efficacy pull-left" :style="{'background-color':'rgba(0, 114, 188, '+ unit.efficacy +' )'}">
        <div class="count">{{unit.efficacy}}</div>
        <div class="title">{{$t('common.efficacy')}}</div>
      </div>
    </div>
  </div>
</div>

    </div>
</template>

<script lang="ts" src="./unit-card.ts"></script>
<style lang="scss" src="./unit-card.scss"></style>
