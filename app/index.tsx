// import FontAwesome from "@expo/vector-icons/FontAwesome";

import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
// import { useFonts } from "expo-font";
// import { useEffect, useState } from "react";
// import { useColorScheme, Text } from "react-native";
import BottomNavigation from "../components/bottomNavigation";

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
import Home from "./home";
import Tags from "./tags";
import Items from "./Items";
import ItemsArchived from "./ItemsArchived";
import History from "./history";
import BottomSheet, { BottomSheetProps } from "../components/BottomSheet";
import OnboardingScreen from "../screens/onboarding";
import { ShoppingListProvider } from "../context/ShoppingList";
import { ColorList, Colors, typeTheme } from "../constants/Colors";
import NewListForm from "../components/NewListForm";
import { RoutesProps, languageType } from "../types/types";
import ProductTab from "./product";
import NewTagForm from "../components/NewTagForm";
import { useRouter } from "expo-router";
import NewProductForm from "../components/NewProductForm";
import ProductsList from "./ProductsList";
import ConfigScreen from "./config";
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
  const [activeRoute, setActiveRoute] = useState<string>("home");
  const [currentLanguage, setCurrentLanguage] = useState<languageType>(
    I18n.defaultLocale as languageType
  );

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
        theme={theme}
        setTheme={setTheme}
        lang={currentLanguage}
        handleLanguageChange={handleLanguageChange}
      >
        {!active && <OnboardingScreen closeOnboarding={closeOnboarding} />}
        {appIsReady && active && (
          <RootLayoutNav
            currentColor={currentColor.color}
            color={currentColor.theme}
            theme={theme}
            currentLanguage={currentLanguage}
            handleColorChange={handleColorChange}
            handleLanguageChange={handleLanguageChange}
          />
        )}
      </ShoppingListProvider>
    </>
  );
}

type RootLayoutNavProps = {
  theme: "light" | "dark";
  color: typeTheme;
  currentColor: ColorList;
  currentLanguage: languageType;
  handleLanguageChange: (newLanguage: languageType) => void;
  handleColorChange: (color: ColorList) => void;
};

function RootLayoutNav({
  theme,
  color,
  currentColor,
  currentLanguage,
  handleLanguageChange,
  handleColorChange,
}: RootLayoutNavProps) {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const [activeRoute, setActiveRoute] = useState<string>("home");
  const [activeRouteHeader, setActiveRouteHeader] = useState<{
    name: React.ReactNode;
    left: React.ReactNode | null;
    right: React.ReactNode | null;
  }>({
    left: null,
    name: <Title color={color[theme].white}>Listas</Title>,
    right: null,
  });

  const [search, setSearch] = useState("");

  const tagRef = useRef<{ handleAddNewTag: (uuid: string) => void } | null>(
    null
  );
  const productListRef = useRef<{
    handleAddProduct: (uuid: string) => void;
  } | null>(null);

  useEffect(() => {
    if (productListRef.current) {
      console.log("productListRef.current", productListRef.current);
    }
    if (tagRef.current) {
      console.log("tagRef.current", tagRef.current);
    }
  }, []);

  const handleCloseBottomSheetList = () => {
    setBottomSheetProps({
      children: (
        <NewListForm
          action="addList"
          buttonText="add"
          onClose={handleCloseBottomSheetList}
        />
      ),
      height: "add",
      isVisible: false,
    });
  };
  const handleCloseBottomSheetProduct = () => {
    setBottomSheetProps({
      children: (
        <NewProductForm
          productListRef={productListRef}
          action="addList"
          buttonText="add"
          onClose={handleCloseBottomSheetProduct}
        />
      ),
      height: "edit",
      isVisible: false,
    });
  };
  const handleCloseBottomSheetProductWithTag = (tag: string) => {
    setBottomSheetProps({
      children: (
        <NewProductForm
          productListRef={productListRef}
          action="addList"
          buttonText="add"
          onClose={handleCloseBottomSheetProduct}
          tagUuid={tag}
        />
      ),
      height: "add",
      isVisible: false,
    });
  };

  const handleCloseBottomSheetTag = () => {
    setBottomSheetProps({
      children: (
        <NewTagForm
          tagRef={tagRef}
          action="addTag"
          buttonText="add"
          onClose={handleCloseBottomSheetTag}
        />
      ),
      height: "add",
      isVisible: false,
    });
  };

  const [bottomSheetProps, setBottomSheetProps] = useState<BottomSheetProps>({
    children: (
      <NewListForm
        action="addList"
        buttonText="add"
        onClose={handleCloseBottomSheetList}
      />
    ),
    height: "add",
    isVisible: false,
  });

  const handleShowSearchInput = () => {
    setActiveRouteHeader({
      left: null,
      name: (
        <HeaderInputTextSearch
          style={{ marginLeft: -16 }}
          placeholder={I18n.t("search")}
          onChangeText={(item) => setSearch(item)}
        />
      ),
      right: (
        <TouchableHighlight
          underlayColor={color[theme].secondary}
          style={{ marginRight: 20 }}
          onPress={() => clearHeaderProduct()}
        >
          <FontAwesome name="times" size={25} color={color[theme].white} />
        </TouchableHighlight>
      ),
    });
  };

  const clearHeaderProduct = () => {
    setSearch("");
    setActiveRouteHeader({
      left: null,
      name: <Title color={color[theme].white}>Produtos</Title>,
      right: (
        <TouchableHighlight
          underlayColor={color[theme].primary}
          style={{ marginLeft: 20, marginRight: 20 }}
          onPress={() => handleShowSearchInput()}
        >
          <FontAwesome name="search" size={25} color={color[theme].white} />
        </TouchableHighlight>
      ),
    });
  };

  const handleChangeRoute = (
    route: "home" | "product" | "tags" | "history"
  ): void => {
    const forms = {
      home: (
        <NewListForm
          action="addList"
          buttonText="add"
          onClose={handleCloseBottomSheetList}
        />
      ),
      product: (
        <NewProductForm
          productListRef={productListRef}
          action="addList"
          buttonText="add"
          onClose={handleCloseBottomSheetProduct}
        />
      ),
      tags: (
        <NewTagForm
          tagRef={tagRef}
          action="addTag"
          buttonText="add"
          onClose={handleCloseBottomSheetTag}
        />
      ),
    };

    if (route != "history" && route != "product") {
      setBottomSheetProps({
        ...bottomSheetProps,
        isVisible: false,
        height: "add",
        children: forms[route],
      });
    }
    if (route === "product") {
      setSearch("");
      setActiveRouteHeader({
        left: null,
        name: <Title color={color[theme].white}>{I18n.t("products")}</Title>,
        right: (
          <TouchableHighlight
            underlayColor={color[theme].primary}
            style={{ marginLeft: 20, marginRight: 20 }}
            onPress={() => handleShowSearchInput()}
          >
            <FontAwesome name="search" size={25} color={color[theme].white} />
          </TouchableHighlight>
        ),
      });
      setBottomSheetProps({
        ...bottomSheetProps,
        isVisible: false,
        height: "edit",
        children: forms[route],
      });
    }

    if (route === "history") {
      setBottomSheetProps({
        ...bottomSheetProps,
        children: <></>,
        isVisible: false,
      });
    }
    setActiveRoute(route);
    router.push({ pathname: route });
  };

  const routes: RoutesProps[] = [
    {
      name: "home",
      icon: "shopping-bag",
      addButton: false,
      func: () => handleChangeRoute("home"),
    },
    {
      name: "product",
      icon: "cube",
      addButton: false,
      func: () => handleChangeRoute("product"),
    },
    {
      name: "add",
      icon: "plus",
      addButton: true,
      func: () =>
        activeRoute !== "history"
          ? setBottomSheetProps({ ...bottomSheetProps, isVisible: true })
          : null,
    },
    {
      name: "tags",
      icon: "tags",
      addButton: false,
      func: () => handleChangeRoute("tags"),
    },
    {
      name: "history",
      icon: "history",
      addButton: false,
      func: () => handleChangeRoute("history"),
    },
  ];

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack.Navigator
        screenOptions={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          headerStyle: {
            backgroundColor: color[theme].primary,
          },
          headerTintColor: color[theme].primary,
        }}
      >
        <Stack.Screen
          name={"home"}
          options={{
            headerLeft: () => null,
            headerRight: () => (
              <TouchableHighlight
                underlayColor={color[theme].primary}
                style={{ marginLeft: 20, marginRight: 20 }}
                onPress={() => router.push({ pathname: "config" })}
              >
                <FontAwesome name="gear" size={25} color={color[theme].white} />
              </TouchableHighlight>
            ),
            headerTitle: (props) => (
              <Title color={color[theme].white}>{I18n.t("lists")}</Title>
            ),
          }}
        >
          {() => (
            <Home
              setBottomSheetProps={setBottomSheetProps}
              bottomSheetProps={bottomSheetProps}
              handleCloseBottomSheet={handleCloseBottomSheetList}
            />
          )}
        </Stack.Screen>
        <Stack.Screen
          name={"product"}
          options={{
            headerLeft: () => activeRouteHeader.left,
            headerRight: () => activeRouteHeader.right,
            headerTitle: () => activeRouteHeader.name,
          }}
        >
          {() => (
            <ProductTab
              search={search}
              setBottomSheetProps={setBottomSheetProps}
              bottomSheetProps={bottomSheetProps}
              handleCloseBottomSheet={handleCloseBottomSheetProduct}
            />
          )}
        </Stack.Screen>
        <Stack.Screen
          name={"tags"}
          options={{
            headerLeft: () => null,
            headerTitle: (props) => (
              <Title color={color[theme].white}>{I18n.t("categories")}</Title>
            ),
          }}
        >
          {() => (
            <Tags
              productListRef={productListRef}
              ref={tagRef}
              setBottomSheetProps={setBottomSheetProps}
              bottomSheetProps={bottomSheetProps}
              handleCloseBottomSheet={handleCloseBottomSheetTag}
            />
          )}
        </Stack.Screen>
        <Stack.Screen
          name="Items"
          options={{
            headerLeft: () => activeRouteHeader.left,
            headerTitle: () => activeRouteHeader.name,
            headerRight: () => activeRouteHeader.right,
          }}
        >
          {() => (
            <Items
              setActiveRouteHeader={setActiveRouteHeader}
              handleCloseBottomSheetList={handleCloseBottomSheetList}
            />
          )}
        </Stack.Screen>
        <Stack.Screen
          name="ProductsList"
          options={{
            headerLeft: () => activeRouteHeader.left,
            headerTitle: () => activeRouteHeader.name,
            headerRight: () => activeRouteHeader.right,
          }}
        >
          {() => (
            <ProductsList
              ref={productListRef}
              setActiveRouteHeader={setActiveRouteHeader}
              setBottomSheetProps={setBottomSheetProps}
              bottomSheetProps={bottomSheetProps}
              handleCloseBottomSheet={handleCloseBottomSheetProductWithTag}
              handleCloseBottomSheetTag={handleCloseBottomSheetTag}
            />
          )}
        </Stack.Screen>
        <Stack.Screen
          name="ItemsArchived"
          options={{
            headerLeft: () => activeRouteHeader.left,
            headerTitle: () => activeRouteHeader.name,
            headerRight: () => activeRouteHeader.right,
          }}
        >
          {() => <ItemsArchived setActiveRouteHeader={setActiveRouteHeader} />}
        </Stack.Screen>
        <Stack.Screen
          name="history"
          component={History}
          options={{
            headerTitle: (props) => (
              <Title color={color[theme].white}>{I18n.t("historic")}</Title>
            ),
            headerLeft: () => null,
          }}
        />
        <Stack.Screen
          name="config"
          options={{
            headerTitle: (props) => (
              <Title color={color[theme].white}>{I18n.t("settings")}</Title>
            ),
            headerLeft: () => (
              <TouchableHighlight
                underlayColor={color[theme].primary}
                style={{ marginLeft: 20, marginRight: 10 }}
                onPress={() => router.push({ pathname: "home" })}
              >
                <FontAwesome
                  name="angle-left"
                  size={35}
                  color={color[theme].white}
                />
              </TouchableHighlight>
            ),
          }}
        >
          {() => (
            <ConfigScreen
              currentLanguage={currentLanguage}
              currentColor={currentColor}
              handleColorChange={handleColorChange}
              handleLanguageChange={handleLanguageChange}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
      <BottomSheet {...bottomSheetProps} />
      <BottomNavigation
        color={color}
        theme={theme}
        routes={routes}
        active={activeRoute}
        setActiveRoute={setActiveRoute}
        setBottomSheetProps={setBottomSheetProps}
        bottomSheetProps={bottomSheetProps}
      />
    </ThemeProvider>
  );
}
