<template>
  <div>
      <Header v-if="account" />
      <NuxtPage />
  </div>
</template>

<script setup lang="ts">
import { useAccount } from "./composables/account";
const { account } = useAccount();
</script>