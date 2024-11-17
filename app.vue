<template>
  <div>
      <HeaderBack v-if="isLogin && routeIndex > -1" />
      <Header v-else-if="isLogin" />
      <NuxtPage />
      <Comments v-if="isLogin" />
  </div>
</template>

<script setup lang="ts">
import { isAuthCheck, headerFilter } from "~/composables/common";
import { useAccount } from "./composables/account";
const { account } = useAccount();
const authUserInfo = useCookie<object | null>('authUserInfo');
const route: any = useRoute();
const routeIndex = ref(route.name ? headerFilter(route.name) : -1);
const isLogin = ref(isAuthCheck(account, authUserInfo));

watch(route, () => {
  if (route.name) {
    routeIndex.value = headerFilter(route.name);
  }
});
watch(authUserInfo, () => {
  isLogin.value = isAuthCheck(account, authUserInfo);
});
</script>