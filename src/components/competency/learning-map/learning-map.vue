<template>
  <div id="learning-map">
    <div class="contents-count">
      <div class="content-count" v-for="content in contentWiseCount">
        <span :class="['icon-area']"><mc-icon :icon="content.icon" /></span>
        <span class="count-value">{{content.count}}</span>
      </div>
    </div>

    <div class="signature-contents">
      <div class="content-type">
        Signature Assessments
      </div>
      <div class="signature-content" v-for="content in signatureAssessments">
        <div class="thumbnail-image" :style="{'background-image': 'url(' + content.thumbnailUrl + ')'}"></div>
        <div class="content-title">{{content.title}}</div>
      </div>
    </div>

    <div class="signature-contents">
      <div class="content-type">
        Signature Collections
      </div>
      <div class="signature-content" v-for="content in signatureCollections">
        <div class="thumbnail-image" :style="{'background-image': 'url(' + content.thumbnailUrl + ')'}"></div>
        <div class="content-title">{{content.title}}</div>
      </div>
    </div>
  </div>
</template>


<script lang="ts" src="./learning-map.ts"></script>
<style lang="scss" src="./learning-map.scss"></style>
