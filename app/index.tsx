// import FontAwesome from "@expo/vector-icons/FontAwesome";

import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
// import { useFonts } from "expo-font";
// import { useEffect, useState } from "react";
// import { useColorScheme, Text } from "react-native";
import BottomNavigation from "./bottomNavigation";

// import {
//   ShoppingListProvider,
//   ShoppingListArchivedProvider,
// } from "../context/ShoppingList";
import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";

const Stack = createStackNavigator();
import React, { useCallback, useEffect, useState } from "react";
import { StatusBar, Text, View, useColorScheme } from "react-native";
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
import {
  ShoppingListProvider,
} from "../context/ShoppingList";
import Colors from "../constants/Colors";
import NewListForm from "../components/NewListForm";
import { RoutesProps } from "../types/types";
import ProductTab from "./product";
import tagsTab from "./tags";
import NewTagForm from "../components/NewTagForm";
import { useRouter } from "expo-router";
import NewProductForm from "../components/NewProductForm";
import ProductsList from "./ProductsList";
import NewItemForm from "../components/NewItemForm";
// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [active, setActive] = useState(false);
  const [appIsReady, setAppIsReady] = useState(false);
  const [activeRoute, setActiveRoute] = useState<string>("home");
  const colorScheme = useColorScheme();
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
      <StatusBar
        backgroundColor={Colors[colorScheme ?? "light"].primary}
      />
      <ShoppingListProvider>
        {!active && <OnboardingScreen closeOnboarding={closeOnboarding} />}
        {appIsReady && active && <RootLayoutNav />}
      </ShoppingListProvider>
    </>
  );
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const [activeRoute, setActiveRoute] = useState<string>("home");
  const [activeRouteHeader, setActiveRouteHeader] = useState<{ name: string, left: React.ReactNode | null, right: React.ReactNode | null }>({
    left: null,
    name: "aaa",
    right: null
  });


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
          action="addList"
          buttonText="add"
          onClose={handleCloseBottomSheetProduct}
        />
      ),
      height: "edit",
      isVisible: false,
    });
  };

  const handleCloseBottomSheetTag = () => {
    setBottomSheetProps({
      children: (
        <NewTagForm
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


  const handleChangeRoute = (route: "home" | "product" | "tags" | "history"): void => {

    const forms = {
      home: <NewListForm
        action="addList"
        buttonText="add"
        onClose={handleCloseBottomSheetList}
      />,
      product: <NewProductForm
        action="addList"
        buttonText="add"
        onClose={handleCloseBottomSheetProduct}
      />,
      tags: <NewTagForm
        action="addTag"
        buttonText="add"
        onClose={handleCloseBottomSheetTag}
      />
    }

    if (route != "history" && route != "product") {
      setBottomSheetProps({
        ...bottomSheetProps,
        isVisible: false,
        height: "add",
        children: forms[route]
      })
    }
    if (route === "product") {
      setBottomSheetProps({
        ...bottomSheetProps,
        isVisible: false,
        height: "edit",
        children: forms[route]
      })
    }

    if (route === "history") {
      setBottomSheetProps({
        ...bottomSheetProps,
        children: <></>,
        isVisible: false,
      })
    }
    setActiveRoute(route);
    router.push({ pathname: route });
  }

  const routes: RoutesProps[] = [
    {
      name: "home",
      icon: "shopping-bag",
      addButton: false,
      func: () =>
        handleChangeRoute("home"),
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
      func: () => activeRoute !== "history" ? setBottomSheetProps({ ...bottomSheetProps, isVisible: true }) : null,
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
            backgroundColor:
              Colors[colorScheme ?? "light"].primary,
          },
          headerTintColor: Colors[colorScheme ?? "light"].primary,
        }}
      >
        <Stack.Screen
          name={"home"}
          options={{
            headerLeft: () => null,
            headerTitle: (props) => (
              <Title color={Colors[colorScheme ?? "light"].white}>
                Listas
              </Title>
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
            headerLeft: () => null,
            headerTitle: (props) => (
              <Title color={Colors[colorScheme ?? "light"].white}>
                Produtos
              </Title>
            ),
          }}
        >
          {() => (
            <ProductTab
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
              <Title color={Colors[colorScheme ?? "light"].white}>
                Categorias
              </Title>
            ),
          }}
        >
          {() => (
            <Tags
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
            headerTitle: (props) => (
              <Title color={Colors[colorScheme ?? "light"].white}>
                {activeRouteHeader.name}
              </Title>
            ),
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
            headerTitle: (props) => (
              <Title color={Colors[colorScheme ?? "light"].white}>
                {activeRouteHeader.name}
              </Title>
            ),
          }}
        >
          {() => (
            <ProductsList
              setActiveRouteHeader={setActiveRouteHeader}
              setBottomSheetProps={setBottomSheetProps}
              bottomSheetProps={bottomSheetProps}
              handleCloseBottomSheet={handleCloseBottomSheetProduct}
              handleCloseBottomSheetTag={handleCloseBottomSheetTag}
            />
          )}
        </Stack.Screen>
        <Stack.Screen
          name="ItemsArchived"
          options={{
            headerLeft: () => activeRouteHeader.left,
            headerTitle: (props) => (
              <Title color={Colors[colorScheme ?? "light"].white}>
                {activeRouteHeader.name}
              </Title>
            ),
            headerRight: () => activeRouteHeader.right,
          }}
        >
          {() => (
            <ItemsArchived
              setActiveRouteHeader={setActiveRouteHeader}
            />
          )}
        </Stack.Screen>
        <Stack.Screen
          name="history"
          component={History}
          options={{
            headerTitle: (props) => (
              <Title color={Colors[colorScheme ?? "light"].white}>
                Histórico
              </Title>
            ),
            headerLeft: () => null,
          }}
        />
      </Stack.Navigator>
      <BottomSheet {...bottomSheetProps} />
      <BottomNavigation
        routes={routes}
        active={activeRoute}
        setActiveRoute={setActiveRoute}
        setBottomSheetProps={setBottomSheetProps}
        bottomSheetProps={bottomSheetProps}
      />
    </ThemeProvider>
  );
}
