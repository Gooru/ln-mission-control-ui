<template>
    <div class="catalog-search">
        <div class="search-section">
            <component :is="searchComponent" 
                        @switchSearch="switchSearch"
                        @comparativeSearch="comparativeSearch" 
                        v-bind="{filterParams}">
                        </component>
        </div>
        <div class="content-loader">
            <component :is="contentComponent" 
                        v-bind="{filterParams}">
            </component>
        </div>
    </div>
</template>

<script lang="ts" src="./catalog-search.ts"></script>
<style lang="scss" scoped src="./catalog-search.scss"></style>