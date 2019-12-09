<template>
    <div id="subject-competency-matrix-filter-container">
         <div class="subject-competency-filter-panel">
             <div class="subject-competency-filter-list">
                 <span>K-12</span>
                 <span>Skills</span>
             </div>
             <div class="subject-competency-filter-icon" @click="showDropdown = !showDropdown">
                <material-icon :icon="showDropdown ? 'close' : 'filter_list'" />
             </div>
         </div>
          <div class="subject-competency-filter-dropdown-container" v-if="showDropdown">
              <div class="subject-competency-selected-filters">
                  <h5 class="subject-competency-selected-filters-title">Seleted Facts</h5>
                  <ul class="seleted-fact-list">
                      <li>k-12 / <span>science</span></li>
                      <li>k-12 / <span>science</span></li>
                      <li>k-12 / <span>science</span></li>
                      <li>k-12 / <span>science</span></li>
                      <li>k-12 / <span>science</span></li>
                  </ul>
              </div>
              <div class="subject-competency-category">
                <h5 class="subject-competency-category-title">Category</h5>
                  <ul class="category-list" v-if="categories">
                      <li v-for="(category, categoryIndex) in categories" :key="categoryIndex" :class="activeCategory.id === category.id ? 'active': ''" @click="onChangeCategory(category)">{{category.title}}</li>
                  </ul>
              </div>
              <div class="subject-competency-framework">
                    <h5 class="subject-competency-framework-title">Framework</h5>
                  <ul class="framework-list" v-if="subjects">
                      <li v-for="(subject, subjectIndex) in subjects" :key="subjectIndex"><input type="checkbox"> <span>{{subject.title}}</span></li>
                  </ul>
              </div>
         </div>
    </div>
</template>
<script lang="ts" src="./learners-competency-filter.ts"></script>
<style lang="scss" src="./learners-competency-filter.scss"></style>
