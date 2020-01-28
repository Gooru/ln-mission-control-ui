<template>
    <div class="mc-proficiency-matrix">
        <div class="profiicency-matrix-container">
          
            <div class="learner-proficiency-chart-container">
                <learner-proficiency-chart
                :subject="subject"
                :isDomainActive ="false"
                :activeDomainSeq="0"
                :isCompetencyActive="false"
                :userId="userId"
                :month="month"
                :year="year" 
                v-on:backAction="backAction"
                v-on:loadingDomain="loadingDomain"
                v-on:onSelectGrade="onSelectGrade"
                v-on:onSelectCompetency="onSelectCompetency"
                :isCompetencyMap="true"
                :isDomainView="isDomainView" />
            </div>
             <div class="rigt-side-card">
                <domain-card 
                    v-if="isDomainView"
                    :domainList="domainList"/>
                <grade-level-card
                    v-if="isGradeView"
                    :activeGrade="activeGrade"
                    :gradeCompetency="gradeCompetency"
                    v-on:onClose="onCloseGrade"/>
                <competency-card 
                    v-if="isCompetencyView && activeCompetency"
                    :activeCompetency="activeCompetency"
                />
             </div>
           
        </div>
    </div>
</template>
<script lang="ts" src="./proficiency-matrix.ts"></script>
<style lang="scss" src="./proficiency-matrix.scss"></style>