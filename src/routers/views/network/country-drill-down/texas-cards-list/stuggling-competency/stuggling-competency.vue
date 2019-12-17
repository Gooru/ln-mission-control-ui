<template>
    <div id="struggling-competency-conatiner">
        <div class="struggling-competency-panel">
            <div class="panel-heading">
                <h4 class="header-title">Struggling Competencies</h4>
            </div>
            <div class="panel-body">
                <div class="panel-content"  v-for="competency in strugglingCompetencies">
                    <div class="top-content">
                        <div class="content-title">{{competency.code}}</div>
                        <div class="content-progress" v-if="hiddenData">
                            <span>36%</span>
                            <progress-bar :totalWidth="['30%']" :color="['red']" />
                        </div>
                        <div class="content-icon" v-if="hiddenData">
                            <material-icon icon="explore" />
                        </div>
                    </div>
                    <div class="sub-content-title">
                        {{competency.name}}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" src="./stuggling-competency.ts"></script>
<style lang="scss" src="./stuggling-competency.scss"></style>
