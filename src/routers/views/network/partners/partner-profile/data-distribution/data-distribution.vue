<template>
  <div id="data-distribution">
    <div class="distribution-category">
      <distribution-by-category v-if="partnerProfile" :partnerProfile="partnerProfile"/>
    </div>
    <div class="distribution-competencies">
      <h5 id="competencies-heading">{{$t("competencies.gained")}}</h5>
      <h3 id="competencies-total">{{partnerProfile.total_competencies_gained}}</h3>
      <p id="competencies-content">{{$t('studying')}} {{$t(partnerProfile.labelKey)}} {{$t("content")}}</p>
    </div>

    <div class="distribution-content">
      <distribution-by-content v-if="partnerProfile" :partnerProfile="partnerProfile"/>
    </div>
  </div>
</template>

<script lang="ts" src="./data-distribution.ts"></script>
<style lang="scss" src="./data-distribution.scss"></style>
