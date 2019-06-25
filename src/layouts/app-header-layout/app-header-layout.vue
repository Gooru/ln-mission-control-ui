<template>
<div id="app-header-layout">
  <header class="app-header">
    <div class="app-nav-menu-slider d-sm-none">
      <i class="fas fa-bars" @click="openAppNav()"></i>
    </div>
    <div class="app-logo-container d-none d-sm-block">
      <div class="app-logo"></div>
    </div>
    <div class="selected-app-nav-menu d-sm-none">
      {{$t(currentRouteName)}}
    </div>
    <app-nav class="d-none d-sm-block" />
    <div class="user-info-container">
      <div class="user-profile-img">
        <img v-bind:src="session.thumbnail_url" />
      </div>
      <div class="username d-none d-sm-block">{{session.user_display_name}}</div>
    </div>
    <b-navbar-nav>
      <b-nav-item-dropdown right>
        <b-dropdown-item class="support-menu action-menu">
          <i class="fa fa-life-ring"></i>
          <span>{{ $t('support') }}</span>
        </b-dropdown-item>
        <b-dropdown-item class="logout-menu action-menu" @click="doLogout()">
          <i class="fa fa-sign-out-alt"></i>
          <span>{{ $t('logout') }}</span>
        </b-dropdown-item>
      </b-nav-item-dropdown>
    </b-navbar-nav>
    <div class="app-side-nav" ref="appSideNav">
      <div class="side-nav-header">
        <div class="app-logo-container">
          <div class="app-logo"></div>
        </div>
        <i class="material-icons close-app-nav" @click="closeAppNav()">close</i>
      </div>
      <app-nav v-on:send="onChangeRoute" />
    </div>
  </header>
  <div class="body-container">
      <router-view></router-view>
  </div>
</div>
</template>
<script lang="ts" src="./app-header-layout.ts"></script>
<style  lang="scss" src="./app-header-layout.scss"></style>
