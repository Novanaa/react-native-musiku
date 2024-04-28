import React from "react";
import fonts from "@/constants/fonts";
import useDefaultTheme from "@/hooks/use-default-theme";
import { useFonts } from "expo-font";
import { Slot, SplashScreen } from "expo-router";
import { Appearance } from "react-native";

SplashScreen.preventAutoHideAsync();

Appearance.setColorScheme(useDefaultTheme());

export default function RootLayout() {
  const [loaded, error] = useFonts(fonts);

  React.useEffect(() => {
    if (error) throw error;

    if (loaded) SplashScreen.hideAsync();
  }, [loaded]);

  if (!loaded && !error) return null;

  return <Slot />;
}
