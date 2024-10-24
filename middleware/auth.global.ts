import { defineNuxtRouteMiddleware, navigateTo } from "nuxt/app";
import type { RouteLocationNormalized } from "vue-router";
import { useAccount } from '~/composables/account';
import { useAuth } from "~/composables/auth";

export default defineNuxtRouteMiddleware(async (to: RouteLocationNormalized) => {
  // loginページの場合なにもしません
  if(to.path == '/member/login') return;

  const { checkAuthState, token } = useAuth();
  const { setAccount } = useAccount();
  await checkAuthState();

  // tokenがなければログインページにリダイレクト
  if (!token.value) {
    return await navigateTo('/member/login', { replace: true });
  } else {
    setAccount(token.value);
  }
});