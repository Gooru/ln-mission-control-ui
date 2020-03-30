<template>
    <div id="struggling-competency-conatiner">
        <div :class="['struggling-competency-panel',{'no-tenant':!isTenant}]">
            <div class="panel-heading">
                <h4 class="header-title">Learning Challenges</h4>
            </div>
            <div class="panel-body" v-if="isTenant">
                <div class="panel-content"  v-for="competency in strugglingCompetencies" :key="competency.code">
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
