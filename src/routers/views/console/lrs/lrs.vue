<template>
    <div id="mc-console-lrs">
        <div class="mc-console-lrs-container">
             <b-alert class="alert-box" :show="isShowMessage" variant="success">"The xAPI statement has been submitted" as a toast!</b-alert>
            <div class="lrs-header">
                 <span><google-icon icon="arrow_back"/></span>
                <span>xAPI & LRS Demo</span>
            </div>
            <div class="lrs-body-container">
                <div class="post-statement-section">
                     <h5 class="post-title">Post xAPI Statements</h5>
                     <div class="post-inputs-content">
                         <div class="statement-input">
                            <span>Statement</span>
                            <b-textarea
                            rows="6"
                            name="post-statement"
                            v-model="postPayload"/>
                         </div>
                     </div>
                    <div class="btn-section">
                         <b-button class="post-btn" variant="primary" v-on:click="onPost()">Post</b-button>
                    </div>
                </div>
                <div class="lrs-query-section">
                    <h5 class="query-title">Query LRS</h5>
                     <div class="query-inputs-content">
                         <div class="agent-input">
                            <span>Agent</span>
                            <b-input type="email" name="query-agent" v-model="queryByAgent" />
                         </div>
                         <div class="activity-input">
                            <span>Activity</span>
                            <b-textarea name="query-activity" v-model="queryByActivity" ></b-textarea>
                         </div>
                     </div>
                      <div class="btn-section">
                         <b-button class="query-btn" variant="primary" v-on:click="onQueryStatements()">Query</b-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./lrs.ts"></script>
<style lang="scss" src="./lrs.scss"></style>
