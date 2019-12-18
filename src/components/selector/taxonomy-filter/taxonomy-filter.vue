<template>
  <div id="taxonomy-filter">
    <div class="filter-header">
      <div class="toggle-filter" @click="isShowFilterBody = !isShowFilterBody">
        <material-icon :icon="isShowFilterBody ? 'close' : 'filter_list'" />
      </div>
    </div>
    <div class="filter-body" v-if="isShowFilterBody">
      <div class="selected-filters">
        <h5 class="selected-label">Seleted Facets</h5>
        <ul class="active-facet-list">
          <li class="active-facet" v-for="subject in selectedSubjects">{{subject.id | extractClassification}} / <span>{{subject.title}}</span></li>
        </ul>
      </div>
      <div class="filter-classifications">
        <h5 class="classification-label">Classifications</h5>
        <ul class="classification-list" v-if="classifications">
          <li class="classification" v-for="(classification, seq) in classifications" :key="seq" :class="{active : activeClassification.id === classification.id}" @click="onSelectClassification(classification)">{{classification.title}}</li>
        </ul>
      </div>
      <div class="filter-subjects">
        <h5 class="subject-label">Facets</h5>
        <ul class="subject-list" v-if="subjects">
          <li class="subject" v-for="(subject, subjectIndex) in subjects" :key="subjectIndex" @click="onSelectSubject(subject)"><input type="checkbox" :checked="subject.isActive"> <span>{{subject.title}}</span></li>
        </ul>
      </div>
    </div>
    <div v-if="isShowFilterBody" class="apply-filter" @click="onApplyFilters()">
      Apply
    </div>
  </div>
</template>
<script lang="ts" src="./taxonomy-filter.ts"></script>
<style lang="scss" src="./taxonomy-filter.scss"></style>
