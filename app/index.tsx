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

// import Home from "./home";
// import Items from "./Items";
// import ItemsArchived from "./ItemsArchived";
// import History from "./history";
// import { RoutesProps } from "../types/types";

// import OnboardingScreen from "../screens/onboarding";
const Stack = createStackNavigator();
// export {
//   // Catch any errors thrown by the Layout component.
//   ErrorBoundary,
// } from "expo-router";

// export const unstable_settings = {
//   // Ensure that reloading on `/modal` keeps a back button present.
//   initialRouteName: "home",
// };

// export default function RootLayout() {
//   const [active, setActive] = useState(false);
//   const [loaded, error] = useFonts({
//     InterBlack: require("../assets/fonts/static/Inter-Black.ttf"),
//     InterBold: require("../assets/fonts/static/Inter-Bold.ttf"),
//     InterExtraBold: require("../assets/fonts/static/Inter-ExtraBold.ttf"),
//     InterExtraLight: require("../assets/fonts/static/Inter-ExtraLight.ttf"),
//     InterLight: require("../assets/fonts/static/Inter-Light.ttf"),
//     InterMedium: require("../assets/fonts/static/Inter-Medium.ttf"),
//     InterRegular: require("../assets/fonts/static/Inter-Regular.ttf"),
//     InterSemiBold: require("../assets/fonts/static/Inter-SemiBold.ttf"),
//     InterThin: require("../assets/fonts/static/Inter-Thin.ttf"),
//     ...FontAwesome.font,
//   });

//   // Expo Router uses Error Boundaries to catch errors in the navigation tree.
//   useEffect(() => {
//     if (error) throw error;
//   }, [error]);

//   const closeOnboarding = () => {
//     setActive(false);
//   };
//   return (
//     <>
//       <Text>Loading...</Text>
//       {/* <ShoppingListProvider> */}
//       {/* <ShoppingListArchivedProvider> */}
//       {/* Keep the splash screen open until the assets have loaded. In the future, we should just support async font loading with a native version of font-display. */}
//       {!loaded && <SplashScreen />}
//       {active && <OnboardingScreen closeOnboarding={closeOnboarding} />}
//       {loaded && !active && <RootLayoutNav />}
//       {/* </ShoppingListArchivedProvider> */}
//       {/* </ShoppingListProvider> */}
//     </>
//   );
// }

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
  ShoppingListArchivedProvider,
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
        backgroundColor={Colors[colorScheme ?? "light"].headerBackgroundColor}
      />
      <ShoppingListProvider>
        <ShoppingListArchivedProvider>
          {/* Keep the splash screen open until the assets have loaded. In the future, we should just support async font loading with a native version of font-display. */}
          {!active && <OnboardingScreen closeOnboarding={closeOnboarding} />}
          {appIsReady && active && <RootLayoutNav />}
        </ShoppingListArchivedProvider>
      </ShoppingListProvider>
    </>
  );
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const [activeRoute, setActiveRoute] = useState<string>("home");
  const handleCloseBottomSheet = () => {
    setBottomSheetProps({ ...bottomSheetProps, isVisible: false });
  };

  const [bottomSheetProps, setBottomSheetProps] = useState<BottomSheetProps>({
    children: (
      <NewListForm
        action="addList"
        buttonText="add"
        onClose={handleCloseBottomSheet}
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
        onClose={handleCloseBottomSheet}
      />,
      product: <NewProductForm
        action="addList"
        buttonText="add"
        onClose={handleCloseBottomSheet}
      />,
      tags: <NewTagForm
        action="addTag"
        buttonText="add"
        onClose={handleCloseBottomSheet}
      />
    }

    if (route != "history" && route != "product") {
      setBottomSheetProps({
        ...bottomSheetProps,
        height: "add",
        children: forms[route]
      })
    }
    if (route === "product") {
      setBottomSheetProps({
        ...bottomSheetProps,
        height: "edit",
        children: forms[route]
      })
    }
    // setActiveRoute(route)
    setActiveRoute(route);
    router.push({ pathname: route });
  }

  const routes: RoutesProps[] = [
    {
      name: "home",
      icon: "shopping-bag",
      addButton: false,
      func: () =>
        handleChangeRoute("home")
      // setBottomSheetProps({
      //   children: (
      //     <NewListForm
      //       action="addList"
      //       buttonText="add"
      //       onClose={handleCloseBottomSheet}
      //     />
      //   ),
      //   height: "add",
      //   isVisible: false,
      // }); setActiveRoute("home")

    },
    {
      name: "product",
      icon: "cube",
      addButton: false,
      func: () => handleChangeRoute("product")
      // setBottomSheetProps({
      //   children: (
      //     <NewListForm
      //       action="addList"
      //       buttonText="add"
      //       onClose={handleCloseBottomSheet}
      //     />
      //   ),
      //   height: "add",
      //   isVisible: false,
      // }); setActiveRoute("product")

    },
    {
      name: "add",
      icon: "plus",
      addButton: true,
      func: () => setBottomSheetProps({ ...bottomSheetProps, isVisible: true }),
    },
    {
      name: "tags",
      icon: "tags",
      addButton: false,
      func: () => handleChangeRoute("tags")

      // func(
      //   setBottomSheetProps({
      //     children: (
      //       <NewTagForm
      //         action="addList"
      //         buttonText="add"
      //         onClose={handleCloseBottomSheet}
      //       />
      //     ),
      //     height: "add",
      //     isVisible: true,
      //   }), setActiveRoute("tags")
      // )
      ,
    },
    {
      name: "history",
      icon: "history",
      addButton: false,
      func: () => handleChangeRoute("history"),
    },
  ];

  return (
    <>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack.Navigator
          screenOptions={{
            cardStyleInterpolator: CardStyleInterpolators.forBottomSheetAndroid,
            headerStyle: {
              backgroundColor:
                Colors[colorScheme ?? "light"].headerBackgroundColor,
            },
            headerTintColor: Colors[colorScheme ?? "light"].headerTextColor,
          }}
        >
          <Stack.Screen
            name={"home"}
            options={{
              headerTitle: (props) => (
                <Title color={Colors[colorScheme ?? "light"].white}>
                  Listas de compras
                </Title>
              ),
            }}
          >
            {() => (
              <Home
                setBottomSheetProps={setBottomSheetProps}
                bottomSheetProps={bottomSheetProps}
                handleCloseBottomSheet={handleCloseBottomSheet}
              />
            )}
          </Stack.Screen>
          <Stack.Screen
            name={"product"}
            options={{
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
                handleCloseBottomSheet={handleCloseBottomSheet}
              />
            )}
          </Stack.Screen>
          <Stack.Screen
            name={"tags"}
            options={{
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
                handleCloseBottomSheet={handleCloseBottomSheet}
              />
            )}
          </Stack.Screen>
          <Stack.Screen
            name="Items"
            options={{
              headerShown: false,
            }}
          >
            {() => (
              <Items
                setBottomSheetProps={setBottomSheetProps}
                bottomSheetProps={bottomSheetProps}
                handleCloseBottomSheet={handleCloseBottomSheet}
              />
            )}
          </Stack.Screen>
          <Stack.Screen
            name="ItemsArchived"
            component={ItemsArchived}
            options={{
              headerShown: false,
            }}
          />
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
    </>
  );
}
