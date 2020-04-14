<template>
    <div class="activity-content">
         <div class="">
           <component
           :is="activeComponent.key"
           v-bind="{ course: courseContent}"></component>
         </div>
    </div>
</template>

<script lang="ts" src="./activity-content.ts"></script>
<style lang="scss" src="./activity-content.scss"></style>