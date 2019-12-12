<template>
    <div id="consumed-progress" :style="{color: color}">
        <div class="content-icon"><material-icon :icon="icon" /></div>
        <div class="consumed-bar"><span :style="{backgroundColor: color, width:width}"></span> <div class="content-score">{{count}}</div></div>
        <div class="content-trading">
            <material-icon :icon="isHigh ? 'arrow_upward' : 'arrow_downward'" />
            {{tradeCount}}
        </div>
    </div>
</template>

<script lang="ts" src="./consumed-progress.ts"></script>
<style lang="scss" src="./consumed-progress.scss"></style>
