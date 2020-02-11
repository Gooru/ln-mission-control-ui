<template>
  <div id="geo-group-picker">
    <div class="group-picker-container">
      <div class="picker-header">
        <span class="picker-level">{{geoGroupLevel}}</span>
      </div>
      <div class="picker-body">
        <div class="search-item">
          <input v-model="searchTerm" placeholder="Search.." />
        </div>
        <div class="picker-items-container">
          <div class="picker-item" v-for="country in filteredItems">
            {{country.country_name}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./geo-group-picker.ts"></script>
<style lang="scss" scoped src="./geo-group-picker.scss"></style>
