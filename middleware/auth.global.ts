import { RouteLocationNormalized } from "vue-router";
import { useAccount } from '~/composables/account';

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
    return await navigateTo('/', { replace: true });
  }
});