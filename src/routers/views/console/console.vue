<template>
  <div class="mc-console">
      <div class="mc-console-container">
         <h4 class="mc-console-title">Welcome {{session.user_display_name}}</h4>
         <div class="mc-console-content-container">
            <div class="impersonate-panel">
              <h5>Impersonate User</h5>
              <p>
                You can impersonate the user in gooru.org. For this you should be having either content admin or user admin role.
              </p>
              <button disabled>
                  Impersonate
              </button>
            </div>
            <div class="create-patner-panel">
              <h5>Create Partner</h5>
              <p>Onboard Partners onto NILE and set up their super admin, cohort and complete other settings</p>
              <button disabled>
                  Setup Partner
              </button>
            </div>
            <div class="lrs-panel">
              <h5>LRS</h5>
              <p>
                You can query LRS for xAPI statements or view data stream by user or activity
              </p>
              <button disabled>Query LRS</button>
            </div>
         </div>
      </div>
  </div>
</template>

<script lang="ts" src="./console.ts"></script>
<style lang="scss" scoped src="./console.scss"></style>
