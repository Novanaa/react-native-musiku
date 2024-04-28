import { Appearance, StyleSheet, View } from "react-native";
import React from "react";
import fonts from "@/constants/fonts";
import useDefaultTheme from "@/hooks/use-default-theme";
import { useFonts } from "expo-font";
import { Slot, SplashScreen } from "expo-router";
import colors from "@/constants/colors";
import { isLightTheme } from "@/utils/app-theme";

SplashScreen.preventAutoHideAsync();

Appearance.setColorScheme(useDefaultTheme());

export default function RootLayout() {
  const [loaded, error] = useFonts(fonts);

  React.useEffect(() => {
    if (error) throw error;

    if (loaded) SplashScreen.hideAsync();
  }, [loaded]);

  if (!loaded && !error) return null;

  return (
    <View style={styles.container}>
      <Slot />
    </View>
  );
}

const backgroundColor: string = isLightTheme()
  ? colors.light.background
  : colors.dark.background;

const styles = StyleSheet.create({
  container: {
    backgroundColor,
    flex: 1,
  },
});
