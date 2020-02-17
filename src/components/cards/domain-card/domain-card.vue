<template>
    <div class="mc-domain-card">
        <div class="mc-domain-card-container">
            <h3 class="domain-header">Domains</h3>
            <div class="domain-body">
               <div class="domain-section" v-for="(domain, index) in domainList" :key="index">
                    <div class="domain-content-title">
                    <material-icon icon="format_align_center"/>
                    <span class="domain-name">{{domain.domainName}}</span>
                    <material-icon icon="arrow_drop_down"/>
                    </div>
                    <div class="domain-content-section">
                        description
                    </div>
               </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./domain-card.ts"></script>
<style lang="scss" scoped src="./domain-card.scss"></style>