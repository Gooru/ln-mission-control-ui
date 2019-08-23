<template>
  <div id="profile-info">
    <div class="profile-info-description">
      <h3 class="profile-heading">{{partnerProfile.partner_name}}</h3>
      <span class="profile-sub-title">{{$t(partnerProfile.labelKey)}}</span>
      <p class="profile-description">{{partnerProfile.intro}}</p>
      <a :href="'http://' + partnerProfile.website" target="_blank">{{partnerProfile.website}}</a>
      <div class="profile-button">
        <profile-gallery
          :galleryData="this.galleryData"
          :partnerProfile="partnerProfile"
        ></profile-gallery>
        <button
          class="btn-links"
          v-if="partnerProfile.images ? partnerProfile.images.length:false"
          v-b-modal="'my-modal'"
          @click="galleryImage('image')"
        >{{$tc('image',2)}}</button>
          <button class="btn-videos"
          v-if="partnerProfile.videos ? partnerProfile.videos.length:false"
          v-b-modal="'my-modal'"
          @click="galleryImage('video')"
          >{{$tc('video',2)}}</button>
      </div>
    </div>
    <div class="profile-info-map">
      <profile-info-map/>
    </div>
  </div>
</template>

<script lang="ts" src="./profile-info.ts"></script>
<style lang="scss" scoped src="./profile-info.scss"></style>
