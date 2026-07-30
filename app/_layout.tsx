import React, { useEffect, useState } from "react";
import { StatusBar } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { FontAwesome } from "@expo/vector-icons";
import { Slot } from "expo-router";
import { StoreProvider, useStores } from "../src/context/StoreContext";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { observer } from "mobx-react-lite";
import I18n from "i18n-js";
import en from "../i18n/en";
import pt from "../i18n/pt-br";
import es from "../i18n/es";
import getLanguageController from "../src/UseCases/Config/GetCurrency";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

I18n.fallbacks = true;
I18n.translations = { en, pt, es };

const loadedLanguage = getLanguageController.handle();
I18n.defaultLocale = loadedLanguage;
I18n.locale = I18n.defaultLocale;

const RootLayoutInner = observer(() => {
  const [appIsReady, setAppIsReady] = useState(false);
  const { ConfigRepository } = useStores();

  useEffect(() => {
    async function prepare() {
      try {
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
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }
    ConfigRepository.firstLoad();
    prepare();
  }, []);

  useEffect(() => {
    if (appIsReady) {
      SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  // NOTE: We render <Slot /> always (never return null) so expo-router's
  // useLinking never tries to setState on an unmounted component tree.
  // The splash screen hides the UI while loading.
  return (
    <>
      <StatusBar backgroundColor={ConfigRepository.color.primary} />
      {appIsReady && <Slot />}
    </>
  );
});

export default function RootLayout() {
  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      <StoreProvider>
        <RootLayoutInner />
      </StoreProvider>
    </SafeAreaProvider>
  );
}
