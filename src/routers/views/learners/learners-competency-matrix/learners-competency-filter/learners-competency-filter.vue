<template>
    <div id="subject-competency-matrix-filter-container">
         <div class="subject-competency-filter-panel">
             <div class="subject-competency-filter-list">
                 <span>K-12</span>
                 <span>Skills</span>
             </div>
             <div class="subject-competency-filter-icon" @click="showDropdown = !showDropdown">
                <material-icon icon="filter_list" />
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
                  <ul class="category-list">
                      <li>K-12</li>
                  </ul>
              </div>
              <div class="subject-competency-framework">
                    <h5 class="subject-competency-framework-title">Framework</h5>
                  <ul class="framework-list">
                      <li><input type="checkbox"> <span>Science</span></li>
                  </ul>
              </div>
         </div>
    </div>
</template>
<script lang="ts" src="./learners-competency-filter.ts"></script>
<style lang="scss" src="./learners-competency-filter.scss"></style>
