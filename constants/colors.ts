import { isLightTheme } from "@/utils/app-theme";

const tintColorLight: string = "#2f95dc";
const tintColorDark: string = "#fff";
const lightBackgroundColor: string = "#FEFEFE";
const darkBackgroundColor: string = "#121212";

const isAppLightTheme: boolean = isLightTheme();

const colors = {
  light: {
    text: darkBackgroundColor,
    background: lightBackgroundColor,
    tint: tintColorLight,
    tabIconDefault: "#ccc",
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: lightBackgroundColor,
    background: darkBackgroundColor,
    tint: tintColorDark,
    tabIconDefault: "#ccc",
    tabIconSelected: tintColorDark,
  },
};

export const backgroundColor: string = isAppLightTheme
  ? lightBackgroundColor
  : darkBackgroundColor;

export const textColor: string = isAppLightTheme
  ? colors.light.text
  : colors.dark.text;

export const tintColor: string = isAppLightTheme
  ? colors.light.tint
  : colors.dark.tint;

export const tabIconSelectedColor: string = isAppLightTheme
  ? colors.light.tabIconSelected
  : colors.dark.tabIconSelected;

export const tabIconDefaultColor: string = isAppLightTheme
  ? colors.light.tabIconDefault
  : colors.dark.tabIconDefault;

export default colors;
