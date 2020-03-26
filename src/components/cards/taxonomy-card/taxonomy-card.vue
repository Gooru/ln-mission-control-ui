<template>
    <div id="taxonomy-card">
        <div class="taxonomy-card-container">
            <div class="taxonomy-visible-container">
                <div class="taxonomy-content" v-for="(tags, tagIndex) in visibleList" v-b-tooltip.hover :title="tags.title" :key="tagIndex">
                    <span class="code">{{tags.code}}</span>
                    <span class="framework-code">{{tags.frameworkCode}} {{tags.parentTitle}}</span>
                </div>
                <b-button variant="light" v-if="isShowMore" @click="isShowNonVisibleTag = !isShowNonVisibleTag" class="show-more-btn">+ {{nonVisibleList.length}}</b-button>
            </div>
            <div class="taxonomy-nonvisible-container" v-if="isShowNonVisibleTag">
                    <div class="taxonomy-content" v-for="(tags, tagIndex) in nonVisibleList" v-b-tooltip.hover :title="tags.title" :key="tagIndex">
                        <span class="code">{{tags.code}}</span>
                        <span class="framework-code">{{tags.frameworkCode}} {{tags.parentTitle}}</span>
                    </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./taxonomy-card.ts"></script>
<style lang="scss" src="./taxonomy-card.scss"></style>