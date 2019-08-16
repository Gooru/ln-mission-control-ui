<template>
  <div id="data-distribution">
    <div class="distribution-category">
      <distribution-by-category v-if="profileData" :profileData="profileData"/>
    </div>
    <div class="distribution-competencies">
      <h5 id="competencies-heading">COMPETENCIES GAINED</h5>
      <h3 id="competencies-total">2,933,824</h3>
      <p id="competencies-content">simply dummy text of the printing</p>
    </div>

    <div class="distribution-content">
      <distribution-by-content v-if="profileData" :profileData="profileData"/>
    </div>
  </div>
</template>

<script lang="ts" src="./data-distribution.ts"></script>
<style lang="scss" src="./data-distribution.scss"></style>