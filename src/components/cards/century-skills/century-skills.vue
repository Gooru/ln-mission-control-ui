<template>
  <div class="century-skills-container">
    <div class="backdrops" @click="onClose()"></div>
    <div class="century-skills-content">
      <div class="century-skills-heading">Add 21st Century Skills</div>
      <div class="century-skills-header">
        <ul class="century-skill-blk">
          <li class="legend">
            <span class="circle hewlett"></span>
            <span>Hewlett Deeper Learning Model</span>
          </li>
          <li class="legend">
            <span class="circle conley"></span>
            <span>Conley Four Keys</span>
          </li>
          <li class="legend">
            <span class="circle framework"></span>
            <span>P21 Framework</span>
          </li>
          <li class="legend">
            <span class="circle national"></span>
            <span>National Research Center for Life and Work</span>
          </li>
        </ul>
      </div>
      <div class="century-skills-body">
        <div class="box cognitive-skills" v-for="(value, key) in groupList" :key="key">
            <span class="title">{{value}}</span>
          <ul>
            <li v-for="content in getGroupContent(value)" @click="onSelectCenturySkills(content)" :key="content.label"> 
                <div class="group-model">
                <span class="circle hewlett" v-if="content.hewlettDeepLearningModel"></span>
                <span class="circle conley" v-if="content.conleyFourKeysModel"></span>
                <span class="circle framework" v-if="content.p21FrameworkModel"></span>
                <span class="circle national" v-if="content.nationalResearchCenterModel"></span>
                </div>
                <span :class="['label',{isActive: isActiveGroup(content)}]">{{content.label}}</span>
                </li>
          </ul>
        </div>
      </div>
      <div class="actions-btn">
          <b-button class="btn" variant="primary" @click="onSubmit()">Select</b-button>
          <b-button class="btn" variant="outline-dark" @click="onClose()">Cancel</b-button>
      </div>
    </div>
  </div>
</template>
<script lang="ts" src="./century-skills.ts"></script>
<style lang="scss" src="./century-skills.scss"></style>
