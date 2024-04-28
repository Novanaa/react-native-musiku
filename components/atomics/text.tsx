import {
  ColorSchemeName,
  Text as NativeText,
  StyleSheet,
  useColorScheme,
} from "react-native";
import React from "react";
import colors from "@/constants/colors";

export default function Text(
  props: React.ComponentProps<"p">
): React.JSX.Element {
  const appTheme: ColorSchemeName = useColorScheme();

  if (appTheme == "dark")
    return <NativeText style={styles.dark}>{props.children}</NativeText>;

  return <NativeText style={styles.light}>{props.children}</NativeText>;
}

const styles = StyleSheet.create({
  light: {
    fontFamily: "regular",
    color: colors.light.text,
  },
  dark: {
    fontFamily: "regular",
    color: colors.dark.text,
  },
});
