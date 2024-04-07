// import FontAwesome from "@expo/vector-icons/FontAwesome";

import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
// import { useFonts } from "expo-font";
// import { useEffect, useState } from "react";
// import { useColorScheme, Text } from "react-native";
import BottomNavigation from "../components/BottomNavigation";

// import {
//   ShoppingListProvider,
//   ShoppingListArchivedProvider,
// } from "../context/ShoppingList";
import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";

const Stack = createStackNavigator();
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  StatusBar,
  Text,
  TextInput,
  TouchableHighlight,
  View,
  useColorScheme,
} from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { FontAwesome } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { getOnboarding, setOnboarding } from "../utils/onboarding";
import { Title } from "../components/Text";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import Home from "../src/screens/home/home";
import Tags from "../src/screens/tags/tags";
import Items from "../src/screens/list/Items";
import ItemsArchived from "../src/screens/listArchived/ItemsArchived";
import History from "../src/screens/history/history";
import BottomSheet, { BottomSheetProps } from "../components/BottomSheet";
import OnboardingScreen from "../screens/onboarding";
import {
  ShoppingListProvider,
  useShoppingListContext,
} from "../context/ShoppingList";
import { ColorList, Colors, colorTheme, typeTheme } from "../constants/Colors";
import NewListForm from "../components/NewListForm";
import { RoutesProps, languageType } from "../types/types";
import ProductTab from "../src/screens/product/product";
import NewTagForm from "../components/NewTagForm";
import { useRouter } from "expo-router";
import NewProductForm from "../components/NewProductForm";
import ProductsList from "../src/screens/productsList/ProductsList";
import ConfigScreen from "../src/screens/config/config";
import NewItemForm from "../components/NewItemForm";
import HeaderInputTextSearch from "../components/HeaderInputTextSearch";
import getThemeController from "../Domain/UseCases/Config/GetTheme";
// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();
import * as Localization from "expo-localization";
import en from "../i18n/en";
import pt from "../i18n/pt-br";
import es from "../i18n/es";
import I18n from "i18n-js";
import getLanguageController from "../Domain/UseCases/Config/GetCurrency";
import getColorController from "../Domain/UseCases/Config/GetColor";
import saveColorController from "../Domain/UseCases/Config/SaveColor";
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
  const [activeRoute, setActiveRoute] = useState<string>("home");
  const [currentLanguage, setCurrentLanguage] = useState<languageType>(
    I18n.defaultLocale as languageType
  );

  const getColor = (): colorTheme => {
    return Colors[color][theme];
  };

  const handleColorChange = (color: ColorList) => {
    // Update the language in state
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

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  const closeOnboarding = () => {
    setActive(true);
    setOnboarding(true);
  };
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
        {!active && <OnboardingScreen closeOnboarding={closeOnboarding} />}
        {appIsReady && active && (
          <Navigation
            currentColor={currentColor.color}
            color={getColor()}
            currentLanguage={currentLanguage}
            handleColorChange={handleColorChange}
            handleLanguageChange={handleLanguageChange}
          />
        )}
      </ShoppingListProvider>
    </>
  );
}


