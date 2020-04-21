<template>
    <div class="activity-search-filter-accordion">
        <div class="activity-search-filter-accordion-container">
            <div class="filter-header" @click="onDropdown(filter)">
                {{$t(filter.title)}} <material-icon :icon="filter.isActive ? 'arrow_drop_up': 'arrow_drop_down'"/>
            </div>
            <div class="filter-body">
                <div class="filter-body-content" v-if="filter.code === 'category' && filter.isActive">
                <span class="item-list" v-for="(item , index) in categoryList" :key="index" @click="onSelectCategory(item)"><material-icon :icon="item.checked ? 'check_box' : 'check_box_outline_blank'"/>{{item.title}}</span>
                </div>
                <div class="filter-body-content" v-if="filter.code === 'subject' && filter.isActive">
                <span class="item-list" v-for="(item , index) in subjectList" :key="index" @click="onSelectSubject(item)"><material-icon :icon="item.checked ? 'check_box' : 'check_box_outline_blank'"/>{{item.title}}</span>
                </div>
                <div class="filter-body-content" v-if="filter.code === 'course' && filter.isActive">
                <span class="item-list" v-for="(item , index) in courseList" :key="index" @click="onSelectCourse(item)"><material-icon :icon="item.checked ? 'check_box' : 'check_box_outline_blank'"/>{{item.title}}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./activity-search-filter-accordion.ts"></script>
<style lang="scss" src="./activity-search-filter-accordion.scss"></style>