<template>
<div id="app-header-layout">
  <header class="app-header">
    <div class="app-logo-container">
      <div class="app-logo"></div>
    </div>
    <app-nav/>
    <div class="user-info-container" @click="toggleActionMenu()">
      <div class="user-profile-img">
        <img v-bind:src="session.thumbnail_url" />
      </div>
      <div class="username">{{session.user_display_name}}</div>
    </div>
    <transition name="fade" mode="in-out" v-if="isShowActionMenu">
      <div class="app-action-menu">
        <div class="action-menu-group">
          <div class="support-menu action-menu">
            <i class="fa fa-life-ring"></i>
            <span>Support</span>
          </div>
        </div>
        <hr/>
        <div class="logout-menu action-menu" @click="doLogout()">
          <i class="fa fa-sign-out-alt"></i>
          <span>Logout</span>
        </div>
      </div>
    </transition>
  </header>
  <div class="body-container">
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</div>
</template>
<script lang="ts" src="./app-header-layout.ts"></script>
<style  lang="scss" src="./app-header-layout.scss"></style>
