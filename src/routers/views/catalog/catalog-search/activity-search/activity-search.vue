<template>
    <div class="activity-search">
        <div class="activity-search-container">
            <div class="search-header">
                <span class="gooru-logo"></span>
                <span class="sub-header">Gooru Catalog</span>
                <input type="text" class="search-input" v-model="searchTerms" @keypress.enter="onSearch" placeholder="Search Gooru's Catalog">
                <div class="search-filter-items">
                    <filter-card :filterList.sync="filterList" @onClearItem="onClearItem"/>
                </div>
                <div class="search-icon"> <span v-if="isSearchTerms" @click="clearSearchBox"><material-icon icon="clear"/></span></div>
                <div class="search-icon" @click="onSearch"><material-icon icon="search"/></div>
                <div class="search-icon"><material-icon icon="filter_list" /></div>
                <div class="comparative-search"> Compare <material-icon icon="person"></material-icon></div>
            </div>
            <div class="activity-tab">
                <div :class="['activity-tab-container',{'no-search': !isSearchTerms}]">
                    <span v-for="(activity, index) in activityTabs" :key="index" :class="{active:activity.isActive}"><mc-icon :icon="activity.key+'-gray'"/>{{activity.name}}</span>
                </div>
            </div>
        </div>
         <activity-search-filter  @onSelectCategory="onSelectCategory" />
    </div>
   
</template>

<script lang="ts" src="./activity-search.ts"></script>
<style lang="scss" scoped src="./activity-search.scss"></style>