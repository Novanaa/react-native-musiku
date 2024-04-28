import { Text as NativeText, StyleSheet, TextProps } from "react-native";
import React from "react";
import colors from "@/constants/colors";
import { isLightTheme } from "@/utils/app-theme";

export default function Text(props: TextProps): React.JSX.Element {
  const themeStyle = isLightTheme() ? styles.light : styles.dark;

  return (
    <NativeText style={[themeStyle, props.style]}>{props.children}</NativeText>
  );
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
