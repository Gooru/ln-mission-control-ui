<template>
    <div class="mc-domain-card">
        <div class="mc-domain-card-container">
            <h3 class="domain-header">Domains</h3>
            <div class="domain-body">
               <div class="domain-section" v-for="(domain, index) in domainList" :key="index">
                    <div class="domain-content-title" @click="onSelectDomain(domain)">
                    <material-icon icon="format_align_center"/>
                    <span class="domain-name">{{domain.domainName}} ({{domain.competencies.length}})</span>
                    <material-icon :icon="domain.isExpanded ? 'arrow_drop_up' : 'arrow_drop_down'"/>
                    </div>
                    <div class="domain-content-section" v-if="domain.isExpanded">
                         <div class="competency-panel" v-for="(competency, competencyIndex) in domain.competencies" @click="onSelectCompetency(competency)" :key="competencyIndex">
                             <div class="competency-title">{{competency.competencyCode}}</div>
                             <div class="competency-description">{{competency.competencyStudentDesc}}</div>
                         </div>
                    </div>
               </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./domain-card.ts"></script>
<style lang="scss" scoped src="./domain-card.scss"></style>