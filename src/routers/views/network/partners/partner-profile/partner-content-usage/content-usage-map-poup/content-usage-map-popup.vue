<template>
    <div id="content-usage-popup">
        <div id="content-usage-popup-container">
            <h5 class="usage-heading">United States of America</h5>
            <!-- <span class="usage-title"><em><b>39,324</b> activities provider this month</em></span> -->
            <p id="usage-implementation">Implementation Splits</p>
           <div id="content-usage-details">
              <table>
                  <tbody>
                      <tr>
                          <td>Students</td>
                          <td><progress id="usage-detail-progress" :value="profileData.total_students" :max="profileData.total_students+1000"></progress></td>
                          <td id="usage-total"><b>{{profileData.total_students}}</b></td>
                      </tr>
                       <tr>
                          <td>Teachers</td>
                          <td><progress id="usage-detail-progress" :value="profileData.total_teachers" :max="profileData.total_teachers+1000"></progress></td>
                          <td id="usage-total"><b>{{profileData.total_teachers}}</b></td>
                      </tr>
                       <tr>
                          <td>Classes</td>
                          <td><progress id="usage-detail-progress" :value="profileData.total_classes" :max="profileData.total_classes+1000"></progress></td>
                          <td id="usage-total"><b>{{profileData.total_classes}}</b></td>
                      </tr>
                      <tr>
                          <td>Others</td>
                          <td><progress id="usage-detail-progress" :value="profileData.total_others" :max="profileData.total_others+1000"></progress></td>
                          <td id="usage-total"><b>{{profileData.total_others}}</b></td>
                      </tr>
                       <tr>
                          <td>Users</td>
                          <td><progress id="usage-detail-progress" :value="profileData.total_users" :max="profileData.total_users+1000"></progress></td>
                          <td id="usage-total"><b>{{profileData.total_users}}</b></td>
                      </tr>
                  </tbody>
              </table>
           </div>
        </div>
    </div>
</template>

<script lang="ts" src="./content-usage-map-popup.ts"></script>
<style lang="scss" src="./content-usage-map-popup.scss"></style>