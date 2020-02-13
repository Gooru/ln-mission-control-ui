<template>
    <div id='learning-map-content'>
        <div class="learning-map-content-container">
                <div class="content-header">
                    <h4>{{selectedContent}}</h4>
                    <span class="close-icon" @click="onClose()"><material-icon icon="close" /></span>
                </div>
                <div class="content-body">
                    <div class="content-panel" v-for="(content, contentIndex) in selectedContentList" :key="contentIndex">
                        <collection-card 
                         :collection="content"/>
                    </div>
                </div>
        </div>
    </div>
</template>

<script lang="ts" src="./learning-map-content.ts"></script>
<style scoped lang="scss" src="./learning-map-content.scss"></style>