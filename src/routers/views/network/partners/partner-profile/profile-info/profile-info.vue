<template>
  <div id="profile-info">
    <div class="profile-info-description">
      <h3 class="profile-heading">{{profileData.partner_name}}</h3>
      <span class="profile-sub-title">{{profileData.partner_type}}</span>
      <p
        class="profile-description"
      >{{profileData.intro}}</p>
      <div class="profile-button">
        <a :href="profileData.websites"><button class="btn-links">Images</button></a>
        <a :href="profileData.videos" target="_blank"><button class="btn-videos">Videos</button></a>
      </div>
    </div>
    <div class="profile-info-map">
      <profile-info-map v-if="mapData" :profileData="profileData" :mapData="mapData"/>
    </div>
  </div>
</template>

<script lang="ts" src="./profile-info.ts"></script>
<style lang="scss" scoped src="./profile-info.scss"></style>
