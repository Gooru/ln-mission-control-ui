<template>
    <div id='learning-map-content'>
        <div class="learning-map-content-container">
                <div class="content-header">
                    <h4>{{selectedContent}}</h4>
                    <span class="close-icon" @click="onClose()"><material-icon icon="close" /></span>
                </div>
                <div class="content-body">
                    <div class="content-panel" v-for="(content, contentIndex) in selectedContentList" :key="contentIndex">
                    <div class="collection-panel" v-if="selectedContent === 'collection'">
                        <collection-card 
                         :collection="content"/>
                    </div>
                    <div class="assessment-panel" v-if="selectedContent === 'assessment'">
                        <assessment-card 
                         :assessment="content"/>
                    </div>
                    <div class="unit-panel" v-if="selectedContent === 'unit'">
                        <unit-card 
                         :unit="content"/>
                    </div>
                    <div class="lesson-panel" v-if="selectedContent === 'lesson'">
                        <lesson-card 
                         :lesson="content"/>
                    </div>
                    <div class="resource-panel" v-if="selectedContent === 'resource'">
                        <resource-card 
                         :resource="content"/>
                    </div>
                    <div class="course-panel" v-if="selectedContent === 'course'">
                        <course-card
                         :course="content"/>
                    </div>
                    <div class="question-panel" v-if="selectedContent === 'question'">
                        <question-card
                         :question="content"/>
                    </div>
                    </div>
                </div>
        </div>
    </div>
</template>

<script lang="ts" src="./learning-map-content.ts"></script>
<style scoped lang="scss" src="./learning-map-content.scss"></style>