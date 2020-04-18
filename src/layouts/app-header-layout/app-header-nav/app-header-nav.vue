<template>
  <div class="app-header-nav">
    <div class="nav-menu-container">
      <div
        class="nav-menu"
        v-for="(item) in menuItems"
        @click="onChangeRoute(item.path)"
        :key="item.path"
        v-bind:class="(currentRoutePath.includes(item.path)) ? 'active':''"
      >
        <span v-if="$access.hasMenuAccess(item.name)">{{ $t(item.name) }}</span>
      </div>
    </div>
  </div>
</template>
<script lang="ts" src="./app-header-nav.ts"></script>
<style  lang="scss" scoped src="./app-header-nav.scss"></style>
