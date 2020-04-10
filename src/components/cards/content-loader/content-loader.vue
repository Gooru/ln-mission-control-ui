<template>
    <div class="content-loader">
            <component 
            :is="activeComponent.tab"
            v-bind.sync="{activeComponent}">

            </component>
    </div>
</template>

<script lang="ts" src="./content-loader.ts"></script>
<style lang="scss" src="./content-loader.scss"></style>