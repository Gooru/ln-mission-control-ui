<template>
    <div class="comparative-search-container">
         <div class="comparative-search-section">
             <span class="back-icon" @click="switchSearch()"><material-icon icon="arrow_back"/></span>
             <input type="text" class="search-box" v-model="searchTerms" @click.enter="comparativeSearch()" placeholder="Type in some keywords in the search box to see the results from different platforms."/>
             <span class="search-icon"><material-icon icon="search" /></span>
             <div class="personalize-search">
                 <span>Personalize</span>
                 <material-icon icon="person"/>
             </div>
         </div>
    </div>
</template>
<script lang="ts" src="./comparative-search.ts"></script>
<style lang="scss" src="./comparative-search.scss"></style>