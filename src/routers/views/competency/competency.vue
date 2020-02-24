<template>
<div class="mc-competency-body">
    <div class="mc-competency-submenu">
                <ul class="mc-competency-submenu-blk">
                    <li v-for="(navMenu, navIndex) in competencyNavMenu" :class="{active: navMenu === 'competency-map'}" @click="onChangeNav(navMenu)" :key="navIndex">{{$t(navMenu)}}</li>
                </ul>
            </div>
    <div class="competency-main">
        <competency-map 
    v-if="isShowCompetencyMap"
    v-on:onSelectSubject="onSelectSubject"
    />
    <proficiency-martix 
    v-if="!isShowCompetencyMap"
    :userId="userId"
    :subject="selectedSubject"
    v-on:backAction="backAction" />
    </div>
</div>
</template>

<script lang="ts" src="./competency.ts"></script>
<style lang="scss" scoped src="./competency.scss"></style>
