import { defineNuxtRouteMiddleware, navigateTo } from "nuxt/app";
import type { RouteLocationNormalized } from "vue-router";
import { useAccount } from '~/composables/account';
import { useAuth } from "~/composables/auth";

export default defineNuxtRouteMiddleware(async (to: RouteLocationNormalized) => {
  // ユーザ情報クッキーから取得
  const authUserInfo:any = useCookie<object | null>('authUserInfo');

  // loginページの場合なにもしません
  if (to.path == '/member/login') return;

  // ログイン情報チェックと取得
  const { checkAuthState } = useAuth();
  const { setAccount, account } = useAccount();
  await checkAuthState();

  // tokenがなければログインページにリダイレクト
  if (!authUserInfo.value || !account.value) {
    setAccount(null);
    return await navigateTo('/member/login', { replace: true });
  } else {
    if (to.path == '/member/login') {
      await navigateTo('/');
    }
    // console.log(account.value);
  }
});