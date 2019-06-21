<template>
  <div class="container-fluid">
  <div class="row">
    <div class="col-xs-12">
      <nav class="navbar navbar-default row">
        <div class="navbar-header">
          <a href="/" class="navbar-brand home-link"></a>
        </div>
        <div class="navbar-menus" v-if="session.isAuthorized">
            <app-nav/>
        </div>
        <div class="navbar-collapse" v-if="session.isAuthorized">
          <ul class="nav navbar-nav menu-navbar">
              <li class="navbar-nav-list visible-md visible-lg profile-link">
                <div class="profile">
                  <div class="img-container pull-left">
                    <img class="img-responsive" src="{{session.user.avatarUrl}}" />
                  </div>
                  <span class="username">{{session.user.username}}</span>
                </div>
              </li>
              <li class="navbar-nav-list visible-md visible-lg dropdown">
                <a class="profile-more dropdown-toggle" href="#" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">

               </a>
                <ul class="dropdown-menu pull-right" role="menu" id="profile-more">
                  <li class="navbar-nav-list">
                    <a href="{{supportSiteUrl}}" target="_blank" class="navbar-link">
                     {{t "common.support"}}
                   </a>
                  </li>
                  <li class="navbar-nav-list">
                    <a class="navbar-link" {{action "logout"}}> {{t "logout.name"}}</a>
                  </li>
                </ul>
              </li>
              <li class="navbar-nav-list hidden-md hidden-lg dropdown xs-design">
                <a class="dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true">{{app-icon name='menu'}}</a>
                <ul class="dropdown-menu" role="menu">
                  <li class="navbar-nav-list close-menu">
                    <button class="btn dropdown-toggle" data-toggle="dropdown">{{app-icon name='close'}}</button>
                  </li>
                  <li class="navbar-nav-list">
                    <span class="profile">{{session.user.username}}</span>
                  </li>
                  <li class="navbar-nav-list">
                    <a href="{{supportSiteUrl}}" target="_blank" class="navbar-link">
                      <span>{{t "common.support"}}</span>
                    </a>
                  </li>
                  <li class="navbar-nav-list">
                    <a class="navbar-link"> {{t "logout.name"}}</a>
                  </li>
                </ul>
              </li>
          </ul>
        </div>
      </nav>
    </div>
  </div>
</template>
<script lang="ts" src="./app-header.ts"></script>
<style  lang="scss" src="./app-header.scss"></style>
