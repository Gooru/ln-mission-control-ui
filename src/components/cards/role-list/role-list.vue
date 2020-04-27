<template>
    <div class="role-list-container">
        <ul class="role-list-blk">
            <li v-for="(role) in roleList" :key="role.code" @click="onChangeRole(role)"> <material-icon icon="person" /> <em>{{role.name}}</em></li>
        </ul>
    </div>
</template>

<script lang="ts" src="./role-list.ts"></script>
<style lang="scss" src="./role-list.scss"></style>