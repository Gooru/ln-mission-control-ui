<template>
    <div id="content-usage-popup">
        <div id="content-usage-popup-container">
            <h5 class="usage-heading">United States of America</h5>
            <span class="usage-title"><em><b>39,324</b> activities provider this month</em></span>
            <p id="usage-implementation">Implementation Splits</p>
           <div id="content-usage-details">
              <table>
                  <tbody>
                      <tr v-for="data in details" :key="data.type">
                          <td><b>{{data.type}}</b></td>
                          <td><progress id="usage-detail-progress" :value="data.total" :max="data.total+1000"></progress></td>
                          <td id="usage-total">{{data.total}}</td>
                      </tr>
                  </tbody>
              </table>
           </div>
        </div>
    </div>
</template>

<script lang="ts" src="./content-usage-map-popup.ts"></script>
<style lang="scss" src="./content-usage-map-popup.scss"></style>