<template>
    <div class="activity-search-filter-accordion">
        <div class="activity-search-filter-accordion-container">
            <div class="filter-header" @click="onDropdown(filter)">
                {{$t(filter.title)}} <material-icon :icon="filter.isActive ? 'arrow_drop_up': 'arrow_drop_down'"/>
            </div>
            <div class="filter-body">
                <div class="filter-body-content" v-if="filter.code === 'category' && filter.isActive">
                <span class="item-list" v-for="(item , index) in categoryList" :key="index" @click="onSelectCategory(item)"><material-icon :icon="item.checked ? 'check_box' : 'check_box_outline_blank'"/><span>{{item.title}}</span></span>
                </div>
                <div class="filter-body-content" v-if="filter.code === 'subject' && filter.isActive">
                <span class="item-list" v-for="(item , index) in subjectList" :key="index" @click="onSelectSubject(item)"><material-icon :icon="item.checked ? 'check_box' : 'check_box_outline_blank'"/><span>{{item.title}}</span></span>
                </div>
                <div class="filter-body-content" v-if="filter.code === 'course' && filter.isActive">
                <span class="item-list" v-for="(item , index) in courseList" :key="index" @click="onSelectCourse(item)"><material-icon :icon="item.checked ? 'check_box' : 'check_box_outline_blank'"/><span>{{item.title}}</span></span>
                </div>
                <div class="filter-body-content" v-if="filter.code === 'dok' && filter.isActive">
                <span class="item-list" v-for="(item , index) in dok" :key="index" @click="onOtherAcivityFilter(dok, item)"><material-icon :icon="item.checked ? 'check_box' : 'check_box_outline_blank'"/><span>{{item.label}}</span></span>
                </div>
                <div class="filter-body-content" v-if="filter.code === 'licenses' && filter.isActive">
                <span class="item-list" v-for="(item , index) in license" :key="index" @click="onOtherAcivityFilter(license, item)"><material-icon :icon="item.checked ? 'check_box' : 'check_box_outline_blank'"/><span :title="item.label">{{item.label}}</span></span>
                </div>
                <div class="filter-body-content" v-if="filter.code === 'audience' && filter.isActive">
                <span class="item-list" v-for="(item , index) in audience" :key="index" @click="onOtherAcivityFilter(audience, item)"><material-icon :icon="item.checked ? 'check_box' : 'check_box_outline_blank'"/><span :title="item.label">{{item.label}}</span></span>
                </div>
                <div class="filter-body-content" v-if="filter.code === '21-century-skills' && filter.isActive">
            
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./activity-search-filter-accordion.ts"></script>
<style lang="scss" src="./activity-search-filter-accordion.scss"></style>