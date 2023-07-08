import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { lazy, useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
const OnboardingScreen = lazy(() => import('../screens/onboarding'));
import { ShoppingListProvider, ShoppingListArchivedProvider } from '../context/ShoppingList';


export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

export default function RootLayout() {
  const [active, setActive] = useState(false);
  const [loaded, error] = useFonts({
    InterBlack: require('../assets/fonts/static/Inter-Black.ttf'),
    InterBold: require('../assets/fonts/static/Inter-Bold.ttf'),
    InterExtraBold: require('../assets/fonts/static/Inter-ExtraBold.ttf'),
    InterExtraLight: require('../assets/fonts/static/Inter-ExtraLight.ttf'),
    InterLight: require('../assets/fonts/static/Inter-Light.ttf'),
    InterMedium: require('../assets/fonts/static/Inter-Medium.ttf'),
    InterRegular: require('../assets/fonts/static/Inter-Regular.ttf'),
    InterSemiBold: require('../assets/fonts/static/Inter-SemiBold.ttf'),
    InterThin: require('../assets/fonts/static/Inter-Thin.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  const closeOnboarding = () => {
    setActive(false);
  }

  return (
    <>
      <ShoppingListProvider>
        <ShoppingListArchivedProvider>
          {/* Keep the splash screen open until the assets have loaded. In the future, we should just support async font loading with a native version of font-display. */}
          {!loaded && <SplashScreen />}
          {active && <OnboardingScreen closeOnboarding={closeOnboarding} />}
          {loaded && !active && <RootLayoutNav />}
        </ShoppingListArchivedProvider >
      </ShoppingListProvider >
    </>
  );
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="iTems" options={{ headerShown: false }} />
        </Stack>
      </ThemeProvider>
    </>
  );
}
