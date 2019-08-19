<template>
    <div id="content-usage-popup">
        <div id="content-usage-popup-container">
            <h5 class="usage-heading">{{country.properties.name}}</h5>
            <p id="usage-implementation">Implementation Splits</p>
           <div id="content-usage-details">
             <div class="content-type-stats" v-for="(type,index) in filerByCountry" :key="index">
                  <p>{{type.content_type}}</p>
                 <p><progress :value="type.total_count" :max="type.total_count+1000"></progress></p>
                 <p class="usage-total"><b>{{numberFormatWithTextSuffix(type.total_count)}}</b></p>
              </div>
           </div>
        </div>
    </div>
</template>

<script lang="ts" src="./content-usage-map-popup.ts"></script>
<style lang="scss" src="./content-usage-map-popup.scss"></style>