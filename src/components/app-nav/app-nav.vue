<template>
<div class="app-nav">
    <div class="nav-menu-container">
      <div class="nav-menu" v-for="(item, index) in menuItems" @click="onChangeRoute(item.path)"  :key="item.path" v-bind:class="(currentRoutePath == item.path) ? 'active':''">
          <span>{{ $t(item.name) }}</span>
      </div>
    </div>
</div>
</template>
<script lang="ts" src="./app-nav.ts"></script>
<style  lang="scss" scoped src="./app-nav.scss"></style>
