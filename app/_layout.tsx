import fonts from "@/constants/fonts";
import { useFonts } from "expo-font";
import { Slot, SplashScreen } from "expo-router";
import React from "react";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts(fonts);

  React.useEffect(() => {
    if (error) throw error;

    if (loaded) SplashScreen.hideAsync();
  }, [loaded]);

  if (!loaded && !error) return null;

  return <Slot />;
}
