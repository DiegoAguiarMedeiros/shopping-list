import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import I18n from "i18n-js";
import { getOnboarding, setOnboarding } from "../src/utils/onboarding";
import OnboardingScreen from "../src/screens/onboarding";
import Navigation from "../src/navigation";
import { useStores } from "../src/context/StoreContext";

const AppScreen = observer(() => {
  const [active, setActive] = useState(false);
  const { ListRepository, ProductRepository, ConfigRepository, TagRepository } = useStores();

  useEffect(() => {
    getOnboarding().then((result) => setActive(result));
  }, []);

  useEffect(() => {
    TagRepository.setTagFilter(I18n.t("all"));
  }, [ConfigRepository.lang]);

  // Touch observable properties to keep MobX reactivity
  ListRepository.lists;
  ListRepository.listsArchived;
  ProductRepository.products;
  TagRepository.tags;
  ConfigRepository.theme;
  ConfigRepository.colors;
  ConfigRepository.color;
  ConfigRepository.currency;
  ConfigRepository.lang;

  const closeOnboarding = () => {
    setActive(true);
    setOnboarding(true);
  };

  if (!active) {
    return <OnboardingScreen closeOnboarding={closeOnboarding} />;
  }

  return <Navigation />;
});

export default AppScreen;
