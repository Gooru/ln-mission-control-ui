<template>
<div id="mc-login-container">
  <div class="login-container">
    <div class="bg-logo-container">
      <div class="bg-logo"></div>
    </div>
    <hr/>
    <b-form class="login-form">
      <div class="username-email-sec">
        <label for="username-or-email">{{ $t('username.or.email') }}</label>
        <b-input v-model="usernameOrEmail" name="username-or-email" v-validate="'required'" :class="{'is-invalid': errors.has('username-or-email')}" id="username-or-email"></b-input>
        <span v-show="errors.has('username-or-email')" class="error">{{ $t('errors.required', {fieldname: 'username or email'}) }}.</span>
      </div>
      <div class="password-sec">
        <label for="password">{{ $t('password') }}</label>
        <b-input v-model="password" type="password" name="password" v-validate="'required'" :class="{'is-invalid': errors.has('password')}" id="password"></b-input>
        <span v-show="errors.has('password')" class="error">{{ $t('errors.required', {fieldname: 'password'}) }}.</span>
      </div>
    </b-form>
    <b-button block  class="login-btn" @click="doLogin()" variant="success">{{ $t('login') }}</b-button>
  </div>
</div>
</template>

<script lang="ts" src="./login.ts"></script>
<style lang="scss" scoped src="./login.scss"></style>
