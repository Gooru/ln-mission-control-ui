<template>
    <div id="content-usage-popup">
        <div id="content-usage-popup-container">
            <h5 class="usage-heading">{{country.properties.name}}</h5>
            <p id="usage-implementation">Implementation Splits</p>
             <div id="content-usage-details">
             <div class="content-type-stats" v-for="(type,index) in contentData" :key="index">
                 <p :class="'icon_' + type.type">{{type.name}}</p>
                 <p><progress :value="contentFindByType(type.type)" :max="contentFindByType(type.type)+1000"></progress></p>
                 <p class="usage-total"><b>{{numberFormatWithTextSuffix(contentFindByType(type.type))}}</b></p>
              </div>
           </div>
        </div>
    </div>
</template>

<script lang="ts" src="./content-usage-map-popup.ts"></script>
<style lang="scss" src="./content-usage-map-popup.scss"></style>