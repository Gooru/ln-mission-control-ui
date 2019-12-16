<template>
  <div id="learner-container">
      <div class="learner-section-container">
          <div class="learner-section-header">
            <h4 class="learner-section-header-title">
              1.3 Million Students | 31 Countries
            </h4>
            <span>
              active in the last 365 days
            </span>
          </div>
          <div class="learner-table-section-container">
             <div class="learner-table-section">
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
               </div>
          </div>
      </div>
      </div>
  </div>
</template>

<script lang="ts" src="./learner-list.ts"></script>
<style lang="scss" scoped src="./learner-list.scss"></style>
