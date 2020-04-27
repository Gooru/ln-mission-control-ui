<template>
    <div class="role-list-container">
        <ul class="role-list-blk">
            <li v-for="(role) in roleList" :key="role.code"> <material-icon icon="person" /> {{role.name}}</li>
        </ul>
    </div>
</template>

<script lang="ts" src="./role-list.ts"></script>
<style lang="scss" src="./role-list.scss"></style>