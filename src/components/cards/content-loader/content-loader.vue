<template>
    <div class="content-loader">
           <keep-alive>
            <component 
            :is="activeComponent.tab"
            v-bind="{activeComponent, filterParams}">
            </component>
            </keep-alive>
    </div>
</template>

<script lang="ts" src="./content-loader.ts"></script>
<style lang="scss" src="./content-loader.scss"></style>