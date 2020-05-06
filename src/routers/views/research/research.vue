<template>
        <div class="research-container">
        <!-- <h3 class="research-head">Research Projects</h3> -->
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
             <div class="content-header">
                 <div class="title-header">
                     <span class="title-text">Title <span class="sort-icon" @click="sortTable('title')"><material-icon :icon="sortOptions.indexOf('title') === -1 ? 'arrow_drop_down' : 'arrow_drop_up'"/></span> </span> 
                     <span class="search-icon"><material-icon icon='search'/></span>
                 </div>
                 <div class="category-header"><span class="title-text">Categories <span class="sort-icon" @click="sortTable('category')"><material-icon :icon="sortOptions.indexOf('category') === -1 ? 'arrow_drop_down' : 'arrow_drop_up'" /></span></span></div>
                 <div class="research-header"><span class="title-text">Research Teams <span class="sort-icon" @click="sortTable('teams')"><material-icon :icon="sortOptions.indexOf('teams') === -1 ? 'arrow_drop_down' : 'arrow_drop_up'" /></span></span></div>
             </div>
             <div class="research-content-panel" v-if="contentList.length">
                <div class="research-content-list" v-for="(content, index) in contentList" :key="index">
                   <div class="description-content"> 
                    <h4>{{content.title}}</h4>
                    <p>{{content.summary}}</p>
                   </div>
                    <span class="sub-category">{{content.category}}</span>

                    <div class="teams-list" v-if="content.teams">
                        <span v-for="(team, index) in content.teams" :key="index">{{team}}</span>
                    </div>
                </div>
             </div>
             
         </div>
      </div>
    </div>
</template>
<script lang="ts" src="./research.ts"></script>
<style lang="scss" scoped src="./research.scss"></style>
