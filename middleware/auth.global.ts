import { defineNuxtRouteMiddleware, navigateTo } from "nuxt/app";
import type { RouteLocationNormalized } from "vue-router";
import { useAccount } from '~/composables/account';
import { useAuth } from "~/composables/auth";

export default defineNuxtRouteMiddleware(async (to: RouteLocationNormalized) => {
  // ユーザ情報クッキーから取得
  const authUserInfo:any = useCookie<object | null>('authUserInfo');

  // loginページの場合なにもしません
  if (to.path == '/member/login') return;
  if (to.path == '/permission') return;
  if (to.path == '/notMobile') return;
  if (to.path == '/error') return;

  // ログイン情報チェックと取得
  const { checkAuthState } = useAuth();
  const { setAccount, account } = useAccount();
  await checkAuthState();

  // tokenがなければログインページにリダイレクト
  if (!authUserInfo.value || !authUserInfo.value.token || !account.value) {
    setAccount(null);
    authUserInfo.value = null;
    return await navigateTo('/member/login', { replace: true });
  } else {
    // 権限チェック
    if (authUserInfo.value.permission < 1) {
      setAccount(null);
      authUserInfo.value = null;
      return await navigateTo('/permission', { replace: true });
    }
    if (to.path == '/member/login') {
      return await navigateTo('/', { replace: true });
    }
  }
});