<template>
  <div id="nav-partners-container" v-if="partners">
    <h2>{{$tc('partner', 2)}}</h2>
    <div id="partners-data">
      <div id="left-partner-panel">
        <div
          class="header-panel-conatiner"
          v-for="(partnerType, typeIndex) in partition1PartnersData"
          :key="typeIndex"
         
        >
          <div class="panel-header"  @click="onPreviewPartnersType(partnerType.pathname)">
            <p>
              <b>{{partnerType.total}}</b>
              {{$t(partnerType.labelKey)}}
            </p>
          </div>
          <div class="panel-body">
            <div class="tabular-container">
              <div class="tabular-head">
                <div class="name">{{$t('name')}}</div>
                <div class="count"># {{$t('of.active.users')}}</div>
              </div>
              <div
                class="tabular-body"
                v-for="(partner, partnerIndex) in partnerType.partners"
                :key="partnerIndex"
              >
                <div class="tabular-data">
                  <div class="name"><div class="partner-logo"><img v-lazy="partner.logo" /></div>{{partner.partner_name}}</div>
                  <div class="count">{{numberFormatWithTextSuffix(partner.total_users)}}</div>
                </div>
              </div>
            </div>
          </div>
          <div :id="'connector-line-p1' + typeIndex" class="connector-line"></div>
        </div>
      </div>
      <div id="partner-panel">
        <div class="panel-conatiner">
          <div class="panel-body">
            <mc-icon icon="navigator-mix-color" />
            <p
              id="partner-count"
            >{{numberFormatWithTextSuffix(overallStats.total_partners)}} {{$tc('partner', 2)}}</p>
            <p
              id="partner-active-count"
            >{{numberFormatWithTextSuffix(overallStats.total_users)}} {{$t('active.users')}}</p>
            <p
              id="no-of-countries"
            >{{numberFormatWithTextSuffix(overallStats.total_countries)}} {{$tc('country', 2)}}</p>
          </div>
        </div>
      </div>
      <div id="right-partner-panel">
        <div
          class="header-panel-conatiner"
          v-for="(partnerType, typeIndex) in partition2PartnersData"
          :key="typeIndex"
        
          :class="partnerType.showTop3Partners ? '' : 'has-not-partners'"
        >
          <div class="panel-header"   @click="onPreviewPartnersType(partnerType.pathname)">
            <p>
              <b v-if="partnerType.showTop3Partners">{{partnerType.total}}</b>
              {{$t(partnerType.labelKey)}}
            </p>
          </div>
          <div class="panel-body">
            <div class="tabular-container" v-if="partnerType.showTop3Partners">
              <div class="tabular-head">
                <div class="name">{{$t('name')}}</div>
                <div class="count"># {{$t('of.active.users')}}</div>
              </div>
              <div
                class="tabular-body"
                v-for="(partner, partnerIndex) in partnerType.partners"
                :key="partnerIndex"
              >
                <div class="tabular-data">
                  <div class="name"><div class="partner-logo"><img v-lazy="partner.logo" /></div>{{partner.partner_name}}</div>
                  <div class="count">{{numberFormatWithTextSuffix(partner.total_users)}}</div>
                </div>
              </div>
            </div>
            <h3 v-else>{{numberFormat(partnerType.totalCount)}}</h3>
          </div>
          <div :id="'connector-line-p2' + typeIndex" class="connector-line"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" src="./partners.ts"></script>
<style lang="scss" scoped  src="./partners.scss"></style>
