import React, { useEffect, useState } from "react";
import { StatusBar, useColorScheme } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { FontAwesome } from "@expo/vector-icons";
import { getOnboarding, setOnboarding } from "../src/utils/onboarding";
import OnboardingScreen from "../src/screens/onboarding";
import { ColorList, Colors, colorTheme, typeTheme } from "../constants/Colors";
import { languageType } from "../src/types/types";
import getThemeController from "../src/UseCases/Config/GetTheme";
// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();
import en from "../i18n/en";
import pt from "../i18n/pt-br";
import es from "../i18n/es";
import I18n from "i18n-js";
import getLanguageController from "../src/UseCases/Config/GetCurrency";
import getColorController from "../src/UseCases/Config/GetColor";
import saveColorController from "../src/UseCases/Config/SaveColor";
import Navigation from "../src/navigation";
import { StoreProvider, useStores } from "../src/context/StoreContext";
import { observer } from "mobx-react-lite";

I18n.fallbacks = true;
I18n.translations = {
  en,
  pt,
  es,
};

// Set the default language
const loadedLanguage = getLanguageController.handle();
I18n.defaultLocale = loadedLanguage;

// Set the initial locale
I18n.locale = I18n.defaultLocale;

const AppContainer = observer(() => {
  const [active, setActive] = useState(false);
  const [appIsReady, setAppIsReady] = useState(false);
  const { ListRepository, ProductRepository, ConfigRepository, TagRepository } = useStores();


  useEffect(() => {
    getOnboarding().then((result) => setActive(result));
    async function prepare() {
      try {
        // Pre-load fonts, make any API ShoppingListProvidercalls you need to do here
        await Font.loadAsync({
          InterBlack: require("../assets/fonts/static/Inter-Black.ttf"),
          InterBold: require("../assets/fonts/static/Inter-Bold.ttf"),
          InterExtraBold: require("../assets/fonts/static/Inter-ExtraBold.ttf"),
          InterExtraLight: require("../assets/fonts/static/Inter-ExtraLight.ttf"),
          InterLight: require("../assets/fonts/static/Inter-Light.ttf"),
          InterMedium: require("../assets/fonts/static/Inter-Medium.ttf"),
          InterRegular: require("../assets/fonts/static/Inter-Regular.ttf"),
          InterSemiBold: require("../assets/fonts/static/Inter-SemiBold.ttf"),
          InterThin: require("../assets/fonts/static/Inter-Thin.ttf"),
          ...FontAwesome.font,
        });
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }
    ConfigRepository.firstLoad();
    prepare();
  }, []);
  useEffect(() => {
    TagRepository.setTagFilter(I18n.t('all'))
  }, [ConfigRepository.lang]);

  if (!appIsReady) {
    return null;
  }

  const closeOnboarding = () => {
    setActive(true);
    setOnboarding(true);
  };

  ListRepository.lists;
  ProductRepository.products;
  TagRepository.tags;
  ConfigRepository.theme;
  ConfigRepository.colors;
  ConfigRepository.color;
  ConfigRepository.currency;
  ConfigRepository.lang;

  return (
    <>
      <StatusBar backgroundColor={ConfigRepository.color.primary} />
      {!active && (
        <OnboardingScreen
          closeOnboarding={closeOnboarding}
        />
      )}
      {appIsReady && active && (
        <Navigation />
      )}
    </>
  );
});


const App = () => (
  <StoreProvider>
    <AppContainer />
  </StoreProvider>
);

export default App;