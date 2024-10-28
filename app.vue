<template>
  <div>
      <Header v-if="account && authUserInfo.token && authUserInfo.permission > 0" />
      <NuxtPage />
      <Comments />
  </div>
</template>

<script setup lang="ts">
import { useAccount } from "./composables/account";
const { account } = useAccount();

const authUserInfo:any = useCookie<object | null>('authUserInfo');
</script>