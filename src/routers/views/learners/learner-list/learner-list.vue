<template>
  <div id="learner-container">
    <div class="learner-section-container">
      <div class="learner-table-section-container">
        <div class="learner-table-section">
          <div class="learner-filter-container">
            <div class="search-box-container">
              <div class="search-box">
                <input v-on:keyup.enter="onSearchLearners" type="text" class="input-box" placeholder="Search..." v-model="searchLearnerText" />
                <span class="search-btn" @click="onSearchLearners()"><material-icon icon="search" /></span>
                <span @click="onClearSearch()" v-if="searchLearnerText !== ''" class="clear-search"><material-icon icon="clear" /></span>
              </div>
            </div>
            <!-- NOTE learner filter will be enabled when required -->
            <!-- <learner-filter /> -->
          </div>
          <div class="learner-table-seaction-header">
            <span class="learner-user-name">Name</span>
            <span>Role</span>
            <span>UserID</span>
            <span class="learner-country">Country</span>
          </div>
          <div class="learner-table-section-body">
            <div class="learner-table-section-body-content" v-for="(learner, learnerKey) in learnerDetails" :key="learnerKey" @click="onSelectLearner(learner)">
              <div class="user-profile">
                <img :src="learner.thumbnail" alt="">
                <span>{{learner.firstname}} {{learner.lastname}}</span>
              </div>
              <div class="learner-role">
                {{learner.userCategory}}
              </div>
              <div class="learner-userid">
                {{learner.email}}
              </div>
              <div class="country">
                {{learner.country}}
              </div>
            </div>
            <div class="no-learners" v-if="learnerDetails.length <= 0 && !isLoading">
              No Learners Found
            </div>
            <div v-if="isLoading" class="text-center loading-spinner">
              <b-spinner variant="primary" label="Spinning"></b-spinner>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./learner-list.ts"></script>
<style lang="scss" scoped src="./learner-list.scss"></style>
