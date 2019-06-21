<template>
<div class="app-nav">
    <ul class="nav nav-tabs" role="tablist">
      <li v-for="(item, index) in menuItems" role="presentation" :key="index" v-bind:class="(activeMenuIndex == index) ? 'active':''">
          <router-link :to="{ path: item.path }" >{{ $t(item.name) }}</router-link>
      </li>
    </ul>
</div>
</template>
<script lang="ts" src="./app-nav.ts"></script>
<style  lang="scss" src="./app-nav.scss"></style>
