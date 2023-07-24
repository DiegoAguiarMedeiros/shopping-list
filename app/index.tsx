import FontAwesome from "@expo/vector-icons/FontAwesome";

import {
  DarkTheme,
  DefaultTheme,
  Link,
  NavigationContainer,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { SplashScreen, useRouter } from "expo-router";
import { lazy, useCallback, useEffect, useState } from "react";
import { TouchableOpacity, useColorScheme, View } from "react-native";
import BottomNavigation from "./bottomNavigation";

import Colors from "../constants/Colors";
const OnboardingScreen = lazy(() => import("../screens/onboarding"));
import {
  ShoppingListProvider,
  ShoppingListArchivedProvider,
} from "../context/ShoppingList";
import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";

import Button from "../components/Button";
import home from "./home";
import iTems from "./iTems";
import history from "./history";
import { RoutesProps, RoutesType } from "../types/types";

const Stack = createStackNavigator();
export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "home",
};

export default function RootLayout() {
  const [active, setActive] = useState(false);
  const [loaded, error] = useFonts({
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

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  const closeOnboarding = () => {
    setActive(false);
  };

  return (
    <>
      <ShoppingListProvider>
        <ShoppingListArchivedProvider>
          {/* Keep the splash screen open until the assets have loaded. In the future, we should just support async font loading with a native version of font-display. */}
          {!loaded && <SplashScreen />}
          {active && <OnboardingScreen closeOnboarding={closeOnboarding} />}
          {loaded && !active && <RootLayoutNav />}
        </ShoppingListArchivedProvider>
      </ShoppingListProvider>
    </>
  );
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const [activeRoute, setActiveRoute] = useState<string>("home");
  const routes: RoutesProps[] = [
    { name: "home", icon: "home" },
    { name: "history", icon: "history" },
  ];

  return (
    <>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack.Navigator
          screenOptions={{
            cardStyleInterpolator:
              CardStyleInterpolators.forRevealFromBottomAndroid, // Add the transition animation here
          }}
        >
          <Stack.Screen
            name={"home"}
            component={home}
            options={{
              headerTitle: "Listas de compras",
              
            }}
          />
          <Stack.Screen
            name="iTems"
            component={iTems}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="history"
            component={history}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
        <BottomNavigation
          routes={routes}
          active={activeRoute}
          setActiveRoute={setActiveRoute}
        />
      </ThemeProvider>
    </>
  );
}
