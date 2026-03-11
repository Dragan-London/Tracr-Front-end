import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { useColorScheme } from "@/src/hooks/use-color-scheme";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="modal"
          options={{ presentation: "modal", title: "Modal" }}
        />
        <Stack.Screen name="sign-up" options={{ title: "Sign Up" }} />
        <Stack.Screen name="map" options={{ title: "Map" }} />
        <Stack.Screen name="post-drawing" options={{ title: "Post Drawing" }} />
        <Stack.Screen name="gallery" options={{ title: "Gallery" }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
