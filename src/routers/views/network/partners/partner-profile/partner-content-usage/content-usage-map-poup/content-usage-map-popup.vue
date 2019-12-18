<template>
    <div id="content-usage-popup">
        <div id="content-usage-popup-container">
            <h5 class="usage-heading">{{activeCountry.properties.name}}</h5>
            <p id="usage-implementation">{{$t('implementation.split')}}</p>
             <div id="content-usage-details">
             <div class="content-type-stats" v-for="(type,index) in contentTypeData" :key="index">
                 <p class="icon_header"><span><mc-icon :icon="type.type + '-gray'" /></span>{{$t(type.labelKey)}}</p>
                 <p><b-progress height="8px" variant="success" :value="contentFindByType(type.type)" :max="totalContentTypeCount"></b-progress></p>
                 <p class="usage-total"><b>{{numberFormatWithTextSuffix(contentFindByType(type.type))}}</b></p>
              </div>
           </div>
        </div>
    </div>
</template>

<script lang="ts" src="./content-usage-map-popup.ts"></script>
<style lang="scss" src="./content-usage-map-popup.scss"></style>
