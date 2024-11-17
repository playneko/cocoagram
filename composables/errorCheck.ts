import { useAccount } from '~/composables/account';
const { setAccount, account } = useAccount();

// エラーチェック
const errorCheck = async () => {
  const authUserInfo = useCookie<object | null>('authUserInfo');

  setAccount(null);
  authUserInfo.value = null;
  return await navigateTo('/error', { replace: true });
}

export { errorCheck };
