<template>
    <div id="texas-card-container">
        <div class="texas-district-title">
         <h5 class="texas-distict-name">districts</h5>
            <material-icon icon="search" />
         </div>
          <div class="texas-district-card" v-for="count in counts" :key="count">
              <div class="card-heading">
                <h5 class="card-title">lytle school district</h5>
                <ul class="texas-card-list">
                    <li><material-icon icon="trending_up"/></li>
                    <li>37%</li>
                    <li>since june</li>
                </ul>
              </div>
              <div class="card-total">
                  <h4 class="total-count">35,999</h4>
                  <span>Total</span>
              </div>
          </div>
    </div>
</template>

<script lang="ts" src="./texas-district-card.ts"></script>
<style lang="scss" src="./texas-district-card.scss"></style>