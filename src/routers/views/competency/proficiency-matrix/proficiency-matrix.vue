<template>
    <div class="mc-proficiency-matrix">
        <div class="profiicency-matrix-container">
          
            <div class="learner-proficiency-chart-container">
                <learner-proficiency-chart
                :subject="subject"
                :isDomainActive ="false"
                :activeDomainSeq="0"
                :isCompetencyActive="isCompetencyActive"
                v-on:onChangeGraphView="onChangeGraphView"
                :userId="userId"
                :month="month"
                :year="year" 
                v-on:backAction="backAction"
                v-on:loadingDomain="loadingDomain"
                v-on:onSelectGrade="onSelectGrade"
                v-on:onSelectCompetency="onSelectCompetency"
                :isCompetencyMap="true"
                :activeCompetency="activeCompetency"
                :isShowMultigrade="true"
                :isDomainView="isDomainView"
                :isCompetencyView="isCompetencyView"
                :isCompetencyLoading ="isLoading"
                :prerequisites="prerequisites" />
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
                    :prerequisites="prerequisites"
                    :learningMapContent="learningMapContent"
                    :microCompetency="microCompetency"
                    v-on:onClose="onCloseGrade"
                    v-on:onSelectContent="onSelectContent"
                    v-on:onSelectMicro ="onSelectMicro"
                    v-on:onSelectDep ="onSelectDep"
                />
                <learning-map-content
                        v-if="isLearningMapContent"
                        :selectedContent ="selectedContent"
                        v-on:onClose ="onCloseLearningMap"
                        :learningMapContent="learningMapContent"/>
             </div>
           
        </div>
    </div>
</template>
<script lang="ts" src="./proficiency-matrix.ts"></script>
<style lang="scss" src="./proficiency-matrix.scss"></style>