<template>
  <div id="learner-proficiency">
    <!-- <div class="month-year-picker">
      <month-year-picker
        @onChageTimeline="onChageTimeline"/>
    </div> -->
    <div class="proficiency-panels-container">
      <div class="proficiency-left-panel">
        <div class="proficiency-header-container">
          <div class="taxonomy-selector">
            <div class="category-selector">
              <div class="active-category" @click="isShowCategories = !isShowCategories">
                {{classificationCode}} <google-material-icon :icon="isShowCategories ? 'arrow_drop_up' : 'arrow_drop_down'" />
              </div>
              <div class="categories" v-if="isShowCategories">
                <div class="category" v-for="category in categories" v-bind:class="{active : activeCategory == category}" @click="onSelectCategory(category)">
                  {{category.title}}
                </div>
              </div>
            </div>
            <div class="subject-selector">
              <div class="active-subject" @click="isShowSubjects = !isShowSubjects">
                {{activeSubject.title}} <google-material-icon :icon="isShowSubjects ? 'arrow_drop_up' : 'arrow_drop_down'" />
              </div>
              <div class="subjects" v-if="isShowSubjects">
                <div class="subject" v-for="subject in subjects" v-bind:class="{active : activeSubject == subject}" @click="onSelectSubject(subject)">
                  {{subject.title}}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="proficiency-body-container" v-if="activeSubject">
          <learner-proficiency-chart
            :subjectCode="subjectCode"
            :timeline = "activeTimeline"
            @backAction="backAction"/>
        </div>
      </div>
      <div class="proficiency-right-panel" v-if="subjectCode">
        <subject-info-panel :subject="activeSubject" :classification="activeCategory" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./learner-proficiency.ts"></script>
<style lang="scss" src="./learner-proficiency.scss"></style>
