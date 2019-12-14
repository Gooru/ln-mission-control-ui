<template>
  <div id="portfolio-content-card">
    <div class="left-panel">
      <div class="activity-info">
        <div class="activity-thumbnail" :style="{'background-image': 'url('+ content.thumbnailUrl +')'}">
        </div>
        <div class="activity-title">
          <span class="title">{{content.title}}</span>
          <span class="owner">by {{content.owner.lastName}} {{content.owner.firstName}}</span>
        </div>
      </div>
      <div class="activity-details">
        <div class="taxonomies">
          <!-- {{#if tags.length}}
            {{taxonomy/gru-taxonomy-tag-list tags=tags tagsVisible=1 isInCard=true}}
          {{/if}} -->
        </div>
        <div class="description">
          {{content.description}}
        </div>
      </div>
      <div class="activity-metadata">
        <div class="last-accessed">
          <span>Last Accessed on</span>
          <span>{{content.activityTimestamp | formatDate}}</span>
        </div>
        <div class="content-count">
          <span v-if="isCollection">
            <div class="count resource-count">
              <span class="icon"><mc-icon icon="resource-gray" /></span>
              <span class="count-value">{{content.resourceCount}}</span>
            </div>
            <div class="count question-count">
              <span class="icon"><mc-icon icon="question-gray" /></span>
              <span class="count-value">{{content.questionCount}}</span>
            </div>
          </span>
          <span v-else-if="isAssessment">
            <div class="count question-count">
              <span class="icon"><mc-icon icon="question-gray" /></span>
              <span class="count-value">{{content.questionCount}}</span>
            </div>
          </span>
          <span v-else-if="isOfflineActivity">
            <div class="count task-count">
              <span class="icon"></span>
              <span class="count-value">{{content.taskCount}}</span>
            </div>
          </span>
        </div>
      </div>
    </div>
    <div class="right-panel">
      <div class="activity-reef-values">
        <div class="releavance activity-reef-value">
          <span class="reef-label">Relevance</span><span class="reef-value">{{content.relevance}}</span>
        </div>
        <div class="engagement activity-reef-value">
          <span class="reef-label">Engagement</span><span class="reef-value">{{content.engagement}}</span>
        </div>
        <div class="efficacy activity-reef-value">
          <span class="reef-label">Efficacy</span><span class="reef-value">{{content.efficacy}}</span>
        </div>
      </div>
      <div class="activity-performance timespent" v-if="isCollection">
        <span v-if="content.timespent">{{content.timespent | formatTime}}</span>
        <span v-else>--</span>
      </div>
      <div v-else class="activity-performance" :class="['grade-range-' + gradeRange(content.score)]">
        {{content.score}}%
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./portfolio-content-card.ts"></script>
<style scoped lang="scss" src="./portfolio-content-card.scss"></style>
