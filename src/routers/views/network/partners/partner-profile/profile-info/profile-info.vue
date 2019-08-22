<template>
  <div id="profile-info">
    <div class="profile-info-description">
      <h3 class="profile-heading">{{profileData.partner_name}}</h3>
      <span class="profile-sub-title">{{$t(profileData.labelKey)}}</span>
      <p class="profile-description">{{profileData.intro}}</p>
      <a :href="profileData.website" target="_blank">{{profileData.website}}</a>
      <div class="profile-button">
        <profile-gallery
          :galleryData="this.galleryData"
          :profileData="profileData"
        ></profile-gallery>
        <button
          class="btn-links"
          v-if="profileData.images"
          v-b-modal="'my-modal'"
          @click="galleryImage('image')"
        >Images</button>
          <button class="btn-videos"
          v-if="profileData.videos"
          v-b-modal="'my-modal'"
          @click="galleryImage('video')"
          >Videos</button>
      </div>
    </div>
    <div class="profile-info-map">
      <profile-info-map :profileData="profileData" :mapData="mapData"/>
    </div>
  </div>
</template>

<script lang="ts" src="./profile-info.ts"></script>
<style lang="scss" scoped src="./profile-info.scss"></style>
