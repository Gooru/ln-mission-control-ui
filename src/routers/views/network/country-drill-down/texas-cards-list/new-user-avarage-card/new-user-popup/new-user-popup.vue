<template>
    <div id="new-user-pullup-container">
        <div class="backdrop" @click="onGoBack()"></div>
        <div class="new-user-pullup-panel">
            <div class="new-user-pullup-panel-heading">
                <div class="new-user-pullup-top-header">
                    <div class="new-user-pullup-back" @click="onGoBack">
                        <material-icon icon="arrow_back"/>
                        <span>Back to Dashboard</span>
                    </div>
                    <h4 class="new-user-pullup-title">
                        New Users
                    </h4>
                </div>
                <div class="new-user-pullup-nav-tab-panel">
                    <ul class="nav-tab-list-blk">
                        <li class="active">All</li>
                        <li>Math</li>
                        <li>Physics</li>
                        <li>Economics</li>
                        <li>ela</li>
                        <li>philosophy</li>
                        <li>chemistry</li>
                        <li>social studies</li>
                    </ul>
                </div>
            </div>
            <div class="new-user-pullup-panel-body">
                <div class="panel-body-left-section">
                    <div class="dount-chart-left">
                        <dount-chart width="200" 
                        height="200" 
                        diff="23" 
                        margin="20" 
                        count="150k" 
                        title="New Users"
                        :data ="data"/>
                        <div class="dount-chart-title">
                            <span>July 2018</span>
                        </div>
                    </div>
                    <div class="student-teacher-ratio">
                        <div class="student-count">
                            <span></span> 340k
                        </div>
                        <div class="teacher-count">
                            <span></span> 14,024
                        </div>
                    </div>

                </div>
                <div class="panel-body-right-section">
                    <div class="country-header">
                        State of Texas
                    </div>
                    <div class="panel-body-content-section">
                    <div class="panel-sub-header-section">
                        <div class="panel-sub-header-left">
                            <span class="level-list">district</span>
                            <span class="student-list">new students</span>
                            <span class="teacher-list">new teachers</span>
                        </div>
                        <div class="panel-sub-header-right">
                            <span>new classes</span>
                        </div>
                    </div>
                    <div class="panel-sub-body-section" v-for="list in itrate" :key="list">
                        <div class="panel-sub-body-left">
                            <div class="body-left-sub-content">
                                <div class="level-content">5th District</div>
                                <div class="level-count">20,392</div>
                            </div>
                            <div class="body-center-sub-content">
                                 <span></span>
                                 <span></span>
                                 <span></span>
                                 <span></span>
                                 <span></span>
                            </div>
                            <div class="body-right-sub-content">
                                 <span></span>
                                 <span></span>
                                 <span></span>
                                 <span></span>
                            </div>
                            <div class="body-last-sub-count">
                                <span>302</span>
                            </div>
                        </div>
                        <div class="panel-sub-body-right">
                            50,304
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
        
    </div>
</template>

<script lang="ts" src="./new-user-popup.ts"></script>
<style lang="scss" scoped src="./new-user-popup.scss"></style>