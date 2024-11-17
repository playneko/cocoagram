import type { RouteLocationNormalized } from 'vue-router';
import { useAccount } from '~/composables/account';

export default defineNuxtRouteMiddleware(async (to: RouteLocationNormalized) => {
  if (to.path == '/notMobile') return;

  const device = useDevice();

  if (!device.isMobile) {
    const { setAccount } = useAccount();
    // ユーザ情報クッキーから取得
    const authUserInfo:any = useCookie<object | null>('authUserInfo');
    setAccount(null);
    authUserInfo.value = null;
    return await navigateTo('/notMobile', { replace: true });
  }
});