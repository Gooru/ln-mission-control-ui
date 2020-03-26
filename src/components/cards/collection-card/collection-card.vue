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

    <div class="resource pull-left">
      <i class="icon"></i>
      <span>{{collection.resourceCount}}</span>
    </div>
  </div>
  <div class="collection-info-container">
    <div class="collection-user-info">
      <div class="created-by">{{collection.creator.usernameDisplay}}</div>
      <div class="img-container pull-left">
        <img class="img-responsive"  :src="collection.creator.profileImage" >
      </div>
      <div class="username">{{collection.creator.usernameDisplay}}</div>
    </div>
    <div class="collection-description" v-html="collection.description">
      {{collection.description}}
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
      <!-- Note: we disable paly button may enable if needed  -->
      <!-- <div class="play-btn" title="Play" @click="onPlayCollection(collection.id)" ><material-icon icon="play_arrow"/></div> -->
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
<style lang="scss" src="./collection-card.scss"></style>