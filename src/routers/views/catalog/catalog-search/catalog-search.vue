<template>
    <div class="catalog-search">
        <div class="search-section">
            <activity-search :filterParams="filterParams"/>
        </div>
        <div class="content-loader">
            <content-loader :filterParams="filterParams"/>
        </div>
    </div>
</template>

<script lang="ts" src="./catalog-search.ts"></script>
<style lang="scss" scoped src="./catalog-search.scss"></style>