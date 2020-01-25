<template>
    <div class="mc-proficiency-matrix">
        <div class="profiicency-matrix-container">
            <learner-proficiency-chart
                :subject="subject"
                :isDomainActive ="false"
                :activeDomainSeq="0"
                :isCompetencyActive="false"
                :userId="userId"
                :month="month"
                :year="year"
                :isCompetencyMap="true"
                v-on:loadingDomain="loadingDomain" />
            <domain-card v-if="domainList.length" :domainList="domainList"/>
        </div>
    </div>
</template>
<script lang="ts" src="./proficiency-matrix.ts"></script>
<style lang="scss" src="./proficiency-matrix.scss"></style>