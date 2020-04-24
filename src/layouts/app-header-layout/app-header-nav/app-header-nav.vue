<template>
  <div class="app-header-nav">
    <div class="nav-menu-container">
      <template  v-for="(item) in menuItems">
      <div
        class="nav-menu"
       v-if="$access.hasMenuAccess(item.name)"
        @click="!item.subMenu ? onChangeRoute(item.path) : null"
        :key="item.path"
        v-bind:class="(currentRoutePath.includes(item.path)) ? 'active':''"
      >
        <span >{{ $t(item.name) }}</span>
        <ul class="research-submenu" v-if="item.subMenu">
            <li v-for="(subMenu, index) in item.subMenu" v-bind:class="(currentRoutePath.includes(item.path)) ? 'active':''" @click="onChangeRoute(subMenu.path)" :key="index">{{subMenu.name}}</li>
        </ul>
      </div>
      </template>
    </div>
  </div>
</template>
<script lang="ts" src="./app-header-nav.ts"></script>
<style  lang="scss" scoped src="./app-header-nav.scss"></style>
