type Tabs = {
  tabs: Ref<any | object>;
  setTabs: (newTabs: any | object) => void;
};

export const useTabs = (): Tabs => {
  const tabs = useState<any | object>("tabs", () => null);

  const setTabs = (newTabs: any | object) => {
    tabs.value = newTabs;
  };

  return {
    tabs,
    setTabs
  };
};
