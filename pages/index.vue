<template>
  <div>
    <Home v-if="tabs === 1" />
    <Compass v-else-if="tabs === 2" />
    <Upload v-else-if="tabs === 3" />
    <Profile v-else-if="tabs === 4" />
  </div>
</template>

<script setup lang="ts">
import { useTabs } from '~/composables/tabs';
const { tabs } = useTabs();
</script>