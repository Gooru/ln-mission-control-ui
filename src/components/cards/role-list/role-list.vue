<template>
    <div class="role-list-container">
        <ul class="role-list-blk">
            <li v-for="(role) in roleList" :class="{'in-active': role.code === showCurrentUser }" :key="role.code" @click="onChangeRole(role)"> <material-icon icon="person" /> <span><b>{{role.username}}</b><em>{{role.name}}</em></span></li>
        </ul>
    </div>
</template>

<script lang="ts" src="./role-list.ts"></script>
<style lang="scss" src="./role-list.scss"></style>