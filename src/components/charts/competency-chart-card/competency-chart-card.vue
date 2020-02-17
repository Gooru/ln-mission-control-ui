<template>
    <div class="competency-chart-card">
        <b-spinner  v-if="isLoading" class="spinner" variant="info" type="grow"></b-spinner>
    </div>
</template>

<script lang="ts" src="./competency-chart-card.ts"></script>
<style lang="scss" scoped src="./competency-chart-card.vue"></style>