<template>
    <div class="activity-search-filter">
        <div class="activity-search-filter-container">
            <div class="filter-heading">
                <h5 class="filter-title">Filters</h5>
                <span @click="$emit('onCloseFilter')"><material-icon icon="close"/></span>
            </div>
            <div class="default-activity-filters">
                <activity-search-filter-accordion 
                v-for="(filter, index) in defaultActivityFilter" 
                :key="index"
                @onSelectCategory="onSelectCategory"
                :defaultActivityFilter="defaultActivityFilter"
                :filter="filter"/>
            </div>
            <div class="activity-filters" v-if="enableOtherFilter">
               <activity-search-filter-accordion 
                v-for="(filter, index) in activityFilter" 
                :key="index"
                @onSelectCategory="onSelectCategory"
                :defaultActivityFilter="defaultActivityFilter"
                :filter="filter"/>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./activity-search-filter.ts"></script>
<style lang="scss" src="./activity-search-filter.scss"></style>
