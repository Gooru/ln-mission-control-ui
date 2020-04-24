<template>
        <div class="research-container">
        <h3 class="research-head">Research Projects</h3>
       <div class="research-sections">
         <div class="research-list-section">
             <div class="category-section">
                <h4>Categories</h4>
                 <ul class="category-blk">
                     <li @click="onSelectCategory('all')" :class="{active: (!isTeamList && activeIndex === -1) }">All ({{researchProjects.length}})</li>
                     <li v-for="(category, index) in researchCategories" :key="index" :class="{active: (activeIndex === index && !isTeamList) }" @click="onSelectCategory(category)">{{category}} ({{categoriesTypes(category).length}})</li>
                 </ul>
             </div>
             <div class="teams-section">
                <h4>Research Team</h4>
                 <ul class="teams-blk">
                     <li @click="onSelectTeam('all')" :class="{active: (isTeamList && activeIndex === -1) }">All ({{researchProjects.length}})</li>
                     <li v-for="(team, index) in reasearchTeams" :key="index" :class="{active: (activeIndex === index && isTeamList) }" @click="onSelectTeam(team)">{{team}} ({{teamsTypes(team).length}})</li>
                 </ul>
             </div>
         </div>
         <div class="research-content-section">
             <template v-if="contentList.length">
                <div class="research-content-list" v-for="(content, index) in contentList" :key="index">
                    <h4>{{content.title}}</h4>
                    <span class="sub-category"><em>{{content.category}}</em></span>
                    <p>{{content.summary}}</p>
                    <div class="teams-list" v-if="content.teams">
                        <span v-for="(team, index) in content.teams" :key="index">{{team}}</span>
                    </div>
                </div>
             </template>
             
         </div>
      </div>
    </div>
</template>
<script lang="ts" src="./research.ts"></script>
<style lang="scss" scoped src="./research.scss"></style>
