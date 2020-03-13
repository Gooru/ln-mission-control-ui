<template>
    <div class="mc-competency-map">
        <div class="mc-competency-map-container">
            <div class="mc-competency-content-section">
                <div class="competency-left-section">
                    <div class="category-header">
                         <b-dropdown class="categories-dropdown" :text="selectedCategory ? selectedCategory.title : ''" variant="none">
                            <b-dropdown-item href="#" 
                            v-for="(category, index) in categories"  
                            :key="index" 
                            :active ="category.id === selectedCategory.id"
                            v-on:click="onSelectCategory(category)">{{category.title}}
                            </b-dropdown-item>
                        </b-dropdown>
                       <span class="header-subtitle">COMMON CORE STATE STANDARDS</span>
                    </div>
                    <div class="subject-list-container">
                        <h5 class="subject-header">SUBJECT</h5>
                        <div class="subject-list-section">
                            <div class="subject-detail" v-for="(subject, index) in subjectList" :key="index">
                                <div class="subject-thumbnail" :style="{backgroundColor: subject.color}">{{subject.title | avatarText}}</div>
                                <div class="subject-title">{{subject.title}}</div>
                            </div> 
                        </div>
                    </div>
                    <div class="create-course">
                        <b-button variant="light" block>Create Course</b-button>
                    </div>
                </div>
                <div class="competency-right-section">
                    <div class="competency-cards-list">
                        <div class="competency-card-panel" v-for="(subject, index) in subjectList" v-on:click="onSelectSubject(subject)" :key="index">
                            <div class="competenct-card-header">
                                <div class="card-thumbnail" :style="{backgroundColor: subject.color}">{{subject.title | avatarText}}</div>
                                <div class="subject-name">{{subject.title}}</div>
                            </div>
                            <div class="competency-card-body">
                                <div class="matrix-chart">
                                    <competency-bar-chart
                                    :subjectCode="subject.code"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./competency-map.ts"></script>
<style lang="scss" src="./competency-map.scss"></style>

