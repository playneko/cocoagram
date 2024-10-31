<template>
  <div>
      <HeaderBack v-if="isLogin && routeIndex > -1" />
      <Header v-else-if="isLogin" />
      <NuxtPage />
      <Comments />
  </div>
</template>

<script setup lang="ts">
import { isAuthCheck, headerFilter } from "~/composables/common";
import { useAccount } from "./composables/account";
const { account } = useAccount();
const authUserInfo = useCookie<object | null>('authUserInfo');
const route = useRoute();
const routeIndex = ref(headerFilter(route.name));
const isLogin = ref(isAuthCheck(account, authUserInfo));

watch(route, () => {
  routeIndex.value = headerFilter(route.name);
});
</script>