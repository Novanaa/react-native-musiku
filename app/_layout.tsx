import React from "react";
import fonts from "@/constants/fonts";
import useDefaultTheme from "@/hooks/use-default-theme";
import { useFonts } from "expo-font";
import { Slot, SplashScreen } from "expo-router";
import {
  Appearance,
  ColorSchemeName,
  StyleSheet,
  View,
  useColorScheme,
} from "react-native";
import colors from "@/constants/colors";

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

const appTheme: ColorSchemeName = Appearance.getColorScheme();
const backgroundColor: string =
  appTheme == "light" ? colors.light.background : colors.dark.background;

const styles = StyleSheet.create({
  container: {
    backgroundColor,
    flex: 1,
  },
});
