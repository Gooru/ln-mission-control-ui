<template>
    <div class="catalog-search">
        <div class="search-section">
            <component :is="searchComponent" @switchSearch="switchSearch()" :filterParams="filterParams"></component>
        </div>
        <div class="content-loader">
            <content-loader :filterParams="filterParams"/>
        </div>
    </div>
</template>

<script lang="ts" src="./catalog-search.ts"></script>
<style lang="scss" scoped src="./catalog-search.scss"></style>