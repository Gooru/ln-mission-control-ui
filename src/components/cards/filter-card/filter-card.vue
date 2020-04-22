<template>
    <div class="filter-card">
        <div class="filter-card-container">
            <div class="filter-card-panel" v-for="(item, index) in visibleFilterList" :key="index">
                <span class="title" v-b-tooltip.hover :title="item.title">{{item.title || item.label}}</span> 
                <span class="close-icon" @click="onClearItem(item)"><material-icon icon="clear" /></span>
                </div>
            <div class="non-visible-filter" v-if="nonVisibleFilterList.length">
                <span class="non-visible-title" @click="isShowNonVisibleTab = !isShowNonVisibleTab">{{nonVisibleCount}} <material-icon icon="add"/></span>
                <div class="non-visible-filter-container" v-if="isShowNonVisibleTab">
                    <div v-for="(item, index) in nonVisibleFilterList" :key="index" class="non-visible-filter-list"><span class="title">{{item.title || item.label}}</span><span class="close-icon" @click="onClearItem(item)"><material-icon icon="clear" /></span></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./filter-card.ts"></script>
<style lang="scss" src="./filter-card.scss"></style>