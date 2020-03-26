<template>
  <div id="mindsets-panel">
    <mindsets-list-panel
    v-bind="{statsBucket: 'facets', userId, month, year, activeFacets, allowedVectorKeys: allowedMindsetKeys}"
    />
  </div>
</template>

<script lang="ts" src="./mindsets-panel.ts"> </script>
<style lang="scss" src="./mindsets-panel.scss" scoped></style>
