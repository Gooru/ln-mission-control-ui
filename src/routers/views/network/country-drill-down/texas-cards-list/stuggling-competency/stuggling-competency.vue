<template>
    <div id="struggling-competency-conatiner">
        <div class="struggling-competency-panel">
            <div class="panel-heading">
                <h4 class="header-title">Struggling Competencies</h4>
            </div>
            <div class="panel-body">
                <div class="panel-content">
                    <div class="top-content">
                        <div class="content-title">8.EE.1</div>
                        <div class="content-progress" v-if="hiddenData">
                            <span>36%</span>
                            <progress-bar :totalWidth="['30%']" :color="['red']" />
                        </div>
                        <div class="content-icon" v-if="hiddenData">
                            <material-icon icon="explore" />
                        </div>
                    </div>
                    <div class="sub-content-title">
                        draw transformed figure
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" src="./stuggling-competency.ts"></script>
<style lang="scss" src="./stuggling-competency.scss"></style>