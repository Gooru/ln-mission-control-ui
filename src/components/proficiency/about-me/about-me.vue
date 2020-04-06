<template>
    <div class="about-me">
        <div class="learners-details">
              <div class="profile-header">
                <img :src="learner.thumbnailUrl" alt="">
                <span>{{learner.fullName}}</span>
              </div>
              <div class="profile-body">
                <div class="panel-details">
                  <label>Country</label>
                  <span>{{learner.country || '--'}}</span>
                </div>
                <div class="panel-details">
                  <label>State/Territory</label>
                  <span>{{learner.state || '--'}}</span>
                </div>
                 <div class="panel-details">
                  <label>District</label>
                  <span>{{learner.district || '--'}}</span>
                </div>
              </div>
              <div class="biography">
                <label>Biography</label>
                {{learner.about || '--'}}
              </div>
          </div>
    </div>
</template>

<script lang="ts" src="./about-me.ts"></script>
<style lang="scss" src="./about-me.scss"></style>
