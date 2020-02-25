<template>
  <div id="community-panel">
    <mindsets-list-panel
    v-bind="{statsBucket: 'facets', userId, month, year, activeFacets, allowedVectorKeys: allowedCommunityKeys}"
    />
  </div>
</template>

<script lang="ts" src="./community-panel.ts"> </script>
<style lang="scss" src="./community-panel.scss" scoped></style>
