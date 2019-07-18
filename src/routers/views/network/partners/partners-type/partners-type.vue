<template>
  <div id="mc-network-partners-type" v-if="partners.length > 0">
    <div id="header-partners-type">
      <div id="back-button" @click="back()">
        <google-material-icon icon="arrow_back" />
      </div>
      <h4>{{partners.length}} {{$t(partnerType.labelKey)}}</h4>
    </div>
    <div id="partners-data-sheet">
      <div id="partners-data-sheet-header">
        <div class="name">{{$t('name')}}</div>
        <div class="country">{{$tc('country', 2)}}</div>
        <div class="learners">{{$tc('learners', 2)}}</div>
        <div class="instructors">{{$t('instructors')}}</div>
      </div>
      <div id="partners-data-sheet-body">
        <div class="partners-data-sheet-content" v-for="(partner, index) in partners" :key="index">
          <div class="name">
            <div class="partner-logo">
              <img v-lazy="partner.logo" />
            </div>
            <p>{{partner.partner_name}}</p>
          </div>
          <div class="country">{{getFirstCountryFromIndex(partner.countries)}}</div>
          <div class="learners">{{numberFormat(partner.total_students)}}</div>
          <div class="instructors">{{numberFormat(partner.total_teachers)}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" src="./partners-type.ts"></script>
<style lang="scss" scoped  src="./partners-type.scss"></style>
