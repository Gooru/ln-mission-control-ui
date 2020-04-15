<template>
    <div class="activity-content">
         <div class="activity-content-loader" v-if="contents.length">
          <component 
                    v-for="content in contents" 
                    :key="content.id"
                    v-bind="contentBind(content)"
                    :is="activeComponent.key">
          </component>
         </div>
    </div>
</template>

<script lang="ts" src="./activity-content.ts"></script>
<style lang="scss" src="./activity-content.scss"></style>