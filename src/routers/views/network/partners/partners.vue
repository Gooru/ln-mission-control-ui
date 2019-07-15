<template>
  <div id="nav-partners-container" v-if="partners">
    <h2>{{$tc('partner', 2)}}</h2>
    <div id="partners-data">
      <div id="left-partner-panel">
        <div
          class="header-panel-conatiner"
          v-for="(partnerType, typeIndex) in partition1PartnersData"
          :key="typeIndex"
          @click="onPreviewPartnersType(partnerType.pathname)"
        >
          <div class="panel-header">
            <p>
              <b>{{partnerType.total}}</b>
              {{$t(partnerType.labelKey)}}
            </p>
          </div>
          <div class="panel-body">
            <h3>{{numberFormat(partnerType.totalTeachers)}}</h3>
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
            >{{numberFormat(overallStats.total_partners)}} {{$tc('partner', 2)}}</p>
            <p
              id="partner-active-count"
            >{{numberFormat(overallStats.total_users)}} {{$t('active.users')}}</p>
            <p
              id="no-of-countries"
            >{{numberFormat(overallStats.total_countries)}} {{$tc('country', 2)}}</p>
          </div>
        </div>
      </div>
      <div id="right-partner-panel">
        <div
          class="header-panel-conatiner"
          v-for="(partnerType, typeIndex) in partition2PartnersData"
          :key="typeIndex"
          @click="onPreviewPartnersType(partnerType.pathname)"
        >
          <div class="panel-header">
            <p>
              <b>{{partnerType.total}}</b>
              {{$t(partnerType.labelKey)}}
            </p>
          </div>
          <div class="panel-body">
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
                <div class="name">{{partner.partner_name}}</div>
                <div class="count">{{numberFormat(partner.total_users)}}</div>
              </div>
            </div>
          </div>
          <div :id="'connector-line-p2' + typeIndex" class="connector-line"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" src="./partners.ts"></script>
<style lang="scss" scoped  src="./partners.scss"></style>
