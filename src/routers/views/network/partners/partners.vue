<template>
  <div id="nav-partners-container">
    <h2>{{$tc('partner', 2)}}</h2>
    <div id="partners-data">
      <div id="left-partner-panel">
        <div
          class="header-panel-conatiner"
          v-for="(partnerCategory, categoryIndex) in partition1PartnersData"
          :key="categoryIndex"
        >
          <div class="panel-header">
            <p>
              <b>{{partnerCategory.total}}</b>
              {{$t(partnerCategory.key)}}
            </p>
          </div>
          <div class="panel-body">
            <div class="tabular-head">
              <div class="name">{{$t('name')}}</div>
              <div class="count"># {{$t('of.active.users')}}</div>
            </div>
            <div
              class="tabular-body"
              v-for="(partner, partnerIndex) in partnerCategory.partners"
              :key="partnerIndex"
            >
              <div class="tabular-data">
                <div class="name">{{partner.partner_name}}</div>
                <div class="count">{{numberFormat(partner.active_users)}}</div>
              </div>
            </div>
          </div>
          <div :id="'connector-line-p1' + categoryIndex" class="connector-line"></div>
        </div>
      </div>
      <div id="partner-panel">
        <div class="panel-conatiner">
          <div class="panel-body">
            <mc-icon icon="navigator-mix-color" />
            <p id="partner-count">34 Partners</p>
            <p id="partner-active-count">1.5M Active Users</p>
            <p id="no-of-countries">12 countries</p>
          </div>
        </div>
      </div>
      <div id="right-partner-panel">
        <div
          class="header-panel-conatiner"
          v-for="(partnerCategory, categoryIndex) in partition2PartnersData"
          :key="categoryIndex"
        >
          <div class="panel-header">
            <p>
              <b>{{partnerCategory.total}}</b>
              {{$t(partnerCategory.key)}}
            </p>
          </div>
          <div class="panel-body">
            <div class="tabular-head">
              <div class="name">{{$t('name')}}</div>
              <div class="count"># {{$t('of.active.users')}}</div>
            </div>
            <div
              class="tabular-body"
              v-for="(partner, partnerIndex) in partnerCategory.partners"
              :key="partnerIndex"
            >
              <div class="tabular-data">
                <div class="name">{{partner.partner_name}}</div>
                <div class="count">{{numberFormat(partner.active_users)}}</div>
              </div>
            </div>
          </div>
          <div :id="'connector-line-p2' + categoryIndex" class="connector-line"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" src="./partners.ts"></script>
<style lang="scss"  src="./partners.scss"></style>
