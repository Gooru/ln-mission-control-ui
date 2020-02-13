<template>
 <div id="resource-card">
<div class="card-panel-container">
  <div :class="['card-panel-header', resource.subformat]">
    <div class="info">
      <div class="title">{{resource.title}}</div>
    </div>
  </div>
  <div class="resource-format-container">
    <span>{{resource.subformat | contentFormator('resource')}}</span>
    <template v-if="!resource.isVisibleOnProfile">
      <div class="visibility  visible_false">
        <material-icon icon="visibility" />
      </div>
    </template>
    <template v-else>
      <div class="visibility visible_true" data-toggle="tooltip" data-placement="top" data-trigger="hover">
        <material-icon icon="visibility" />
      </div>
    </template>
  </div>
  <div class="resource-info-container">
    <div class="resource-user-info">
      <div class="created-by">{{resource.creator.usernameDisplay}}</div>
      <div class="img-container pull-left">
        <img class="img-responsive"  :src="resource.creator.profileImage" >
      </div>
      <div class="username">{{resource.creator.usernameDisplay}}</div>
    </div>
    <div class="resource-description" v-html="resource.description">
      {{resource.description}}
    </div>
    <div class="resource-standards ">
       <taxonomy-card 
          v-if="tags.length"
          visibleTags=1
          :taxonomyList="tags"
           />
    </div>

  </div>
  <div class="card-panel-footer">
    <div class="buttons-container">
      <!-- <div class="play-btn" title="Play" data-toggle="tooltip" data-placement="right" {{action "onPlayResource" resource.id}}>{{gru-icon name="ic_play_arrow"}}</div> -->
    </div>
    <div class="resource-prefs-container">
      <span class="left-arc"></span>
      <span class="right-arc"></span>
      <div class="resource-prefs relevance pull-left" :style="{'background-color':'rgba(0, 114, 188, '+ resource.relevance +' )'}">
        <div class="count">{{resource.relevance}}</div>
        <div class="title">{{$t('common.relevance')}}</div>
      </div>
      <div class="resource-prefs engagement pull-left" :style="{'background-color':'rgba(0, 114, 188, '+ resource.engagement +' )'}">
        <div class="count">{{resource.engagement}}</div>
        <div class="title">{{$t('common.engagement')}}</div>
      </div>
      <div class="resource-prefs efficacy pull-left" :style="{'background-color':'rgba(0, 114, 188, '+ resource.efficacy +' )'}">
        <div class="count">{{resource.efficacy}}</div>
        <div class="title">{{$t('common.efficacy')}}</div>
      </div>
    </div>
  </div>
</div>

 </div>
</template>

<script lang="ts" src="./resource-card.ts"></script>
<style lang="scss" src="./resource-card.scss"></style>
