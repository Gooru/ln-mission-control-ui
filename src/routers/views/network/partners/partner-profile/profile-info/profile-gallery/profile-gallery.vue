<template>
  <div id="profile-gallery">
    <b-modal size="lg" id="my-modal" :title="$t(galleryData)"  hide-footer> 
    <b-carousel
      id="carousel-1"
      v-model="slide"
      :interval="4000"
      controls
      indicators
      background="#ababab"
      img-width="1024"
      img-height="480"
      style="text-shadow: 1px 1px 2px #333;"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
    >
      <div v-if="galleryData == 'image'">
        <b-carousel-slide v-for="(img,index) in profileData.images" :key="index" :img-src="img"></b-carousel-slide>
      </div>
      <div class="video-gallery" v-if="galleryData == 'video'">
        <b-carousel-slide
          v-for="(video,index) in profileData.videos"
          :key="index"
          img-blank
        >
          <iframe
            width="500"
            height="300"
            :src="video"
            frameborder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </b-carousel-slide>
      </div>
    </b-carousel>
    </b-modal>
  </div>
</template>

<script lang="ts" src="./profile-gallery.ts"></script>
<style lang="scss" src="./profile-gallery.scss"></style>
