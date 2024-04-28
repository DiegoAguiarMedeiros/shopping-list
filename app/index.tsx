import React, { useEffect, useState } from "react";
import { StatusBar, useColorScheme } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { FontAwesome } from "@expo/vector-icons";
import { getOnboarding, setOnboarding } from "../src/utils/onboarding";
import OnboardingScreen from "../src/screens/onboarding";
import { ShoppingListProvider } from "../src/context/ShoppingList";
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

export default function App() {
  const [active, setActive] = useState(false);
  const [appIsReady, setAppIsReady] = useState(false);
  const colorLoaded = getColorController.handle();
  const [currentColor, setCurrentColor] = useState<{
    color: ColorList;
    theme: typeTheme;
  }>({
    color: colorLoaded,
    theme: Colors[colorLoaded],
  });
  const colorScheme = useColorScheme();

  const returnTheme = (): "light" | "dark" => {
    const loadedTheme = getThemeController.handle();
    if (loadedTheme === "light" || loadedTheme === "dark") return loadedTheme;
    if (colorScheme) return colorScheme;
    return "light";
  };
  const [theme, setTheme] = useState<"light" | "dark">(returnTheme());
  const [color, setColor] = useState<ColorList>("#43BCAE");
  const [currentLanguage, setCurrentLanguage] = useState<languageType>(
    I18n.defaultLocale as languageType
  );

  const getColor = (): colorTheme => {
    return Colors[color][theme];
  };

  const handleColorChange = (color: ColorList) => {
    // Update the language in state
    setColor(color);
    setCurrentColor({
      color: color,
      theme: Colors[color],
    });
    saveColorController.handle(color);
  };
  const handleLanguageChange = (newLanguage: languageType) => {
    // Update the language in state
    setCurrentLanguage(newLanguage);

    // Set the new language in react-native-i18n
    I18n.locale = newLanguage;
  };

  useEffect(() => {
    getOnboarding().then((result) => setActive(result));
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
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

    prepare();
  }, []);

  if (!appIsReady) {
    return null;
  }

  const closeOnboarding = () => {
    setActive(true);
    setOnboarding(true);
  };

  const colorTheme = getColor();
  return (
    <>
      <StatusBar backgroundColor={currentColor.theme[theme].primary} />
      <ShoppingListProvider
        color={color}
        setColor={setColor}
        theme={theme}
        setTheme={setTheme}
        lang={currentLanguage}
        handleLanguageChange={handleLanguageChange}
      >
        {!active && (
          <OnboardingScreen
            color={colorTheme}
            closeOnboarding={closeOnboarding}
          />
        )}
        {appIsReady && active && (
          <Navigation
            currentColor={currentColor.color}
            color={colorTheme}
            currentLanguage={currentLanguage}
            handleColorChange={handleColorChange}
            handleLanguageChange={handleLanguageChange}
          />
        )}
      </ShoppingListProvider>
    </>
  );
}
