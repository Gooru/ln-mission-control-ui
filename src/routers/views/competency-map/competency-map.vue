<template>
    <div class="mc-competency-map">
        <div class="mc-competency-submenu">
                <ul class="mc-competency-submenu-blk">
                    <li>Dashboard</li>
                    <li class="active">Competency Map</li>
                    <li>Crosswalk</li>
                    <li>Tree</li>
                    <li>Learning Map</li>
                </ul>
            </div>
        <div class="mc-competency-map-container">
            <div class="mc-competency-content-section">
                <div class="competency-left-section">
                    <div class="category-header">
                         <b-dropdown class="categories-dropdown" text="Selection of Categories" variant="none">
                            <b-dropdown-item href="#">Selection of Categories</b-dropdown-item>
                            <b-dropdown-item href="#">Another action</b-dropdown-item>
                            <b-dropdown-item href="#">Something else here</b-dropdown-item>
                        </b-dropdown>
                       <span class="header-subtitle">COMMON CORE STATE STANDARDS</span>
                    </div>
                    <div class="subject-list-container">
                        <h5 class="subject-header">SUBJECT</h5>
                        <div class="subject-list-section">
                            <div class="subject-detail">
                                <div class="subject-thumbnail"></div>
                                <div class="subject-title">Biology</div>
                            </div> 
                        </div>
                    </div>
                    <div class="create-course">
                        <b-button variant="secondary" block disabled>Create Course</b-button>
                    </div>
                </div>
                <div class="competency-right-section"></div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./competency-map.ts"></script>
<style lang="scss" scoped src="./competency-map.scss"></style>

