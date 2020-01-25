<template>
<div>
    <competency-map 
    v-if="isShowCompetencyMap"
    v-on:onSelectSubject="onSelectSubject"
    />
    <proficiency-martix 
    v-if="!isShowCompetencyMap"
    :userId="userId"
    :subject="selectedSubject" />
</div>
</template>

<script lang="ts" src="./competency.ts"></script>
<style lang="scss" scoped src="./competency.scss"></style>
