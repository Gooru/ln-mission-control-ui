<template>
  <div id="domains-list-panel">
    <div class="panel-header">
      {{subject.title}}
    </div>
    <div class="panel-body">
      <div class="domains-label">Domains</div>
      <div class="loading-spinner">
        <b-spinner v-if="isLoading" variant="primary" label="Spinning"></b-spinner>
      </div>
      <div class="domains-list" v-if="!isLoading">
        <div class="domain-info" v-for="domain in domainProficiencyData" @click="onSelectdomain(domain)">
          <div class="domain-name">
            <span class="domain-seq">{{domain.domainSeq}}.</span>
            <span class="domain-title">{{domain.domainName}}</span>
          </div>
          <div class="competencies-info">
            <div class="mastered-info type-info">
              <span class="count">{{domain.masteredCompetencies}}</span> <span class="box competency-status-4"></span>
            </div>
            <div class="inprogress-info type-info">
              <span class="count">{{domain.inprogressCompetencies}}</span> <span class="box competency-status-1"></span>
            </div>
            <div class="notstarted-info type-info">
              <span class="count">{{domain.notstartedCompetencies}}</span> <span class="box competency-status-0"></span>
            </div>
            <div class="total-competencies">
              <span class="count">{{domain.competencies.length}}</span>
              <span class="competencies-label">Competencies</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <domain-info-panel
      v-if="isShowDomainInfo"
      :domain="activeDomainInfo"
      :subject="subject"
      :classification="classification"
      @onCloseDomainInfoPanel = "onCloseDomainInfoPanel"/>
  </div>
</template>

<script lang="ts" src="./domains-list-panel.ts"></script>
<style lang="scss" src="./domains-list-panel.scss"></style>
