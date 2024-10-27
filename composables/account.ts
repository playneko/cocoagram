type Account = {
  account: Ref<any | object>;
  setAccount: (newAccount: any | object) => void;
};

export const useAccount = (): Account => {
  const account = useState<any | object>("account", () => null);

  const setAccount = (newAccount: any | object) => {
    account.value = newAccount;
  };

  return {
    account,
    setAccount
  };
};
