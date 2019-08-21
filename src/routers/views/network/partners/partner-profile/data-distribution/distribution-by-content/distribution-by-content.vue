<template>
    <div id="distribution-content-section">
        <div id="content-distribution-piechart"></div>
        <div>
                <p>{{$t('distribution.by.content.type')}}</p>
        </div>
        <div id="content-type-tooltip">
            <p>{{$t(contentTypeTooltipLabel)}}</p>
        </div>
    </div>
</template>

<script lang="ts" src="./distribution-by-content.ts"></script>
<style lang="scss" src="./distribution-by-content.scss"></style>