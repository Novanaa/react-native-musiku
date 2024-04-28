import { Appearance } from "react-native";

export function isDarkTheme(): boolean {
  return Appearance.getColorScheme() == "dark";
}

export function isLightTheme(): boolean {
  return Appearance.getColorScheme() == "light";
}
