const tintColorLight: string = "#2f95dc";
const tintColorDark: string = "#fff";
const lightBackgroundColor: string = "#FEFEFE";
const darkBackgroundColor: string = "#121212";

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

export const backgroundColor: string = darkBackgroundColor;

export const textColor: string = colors.dark.text;

export const tintColor: string = colors.dark.tint;

export const tabIconSelectedColor: string = colors.dark.tabIconSelected;

export const tabIconDefaultColor: string = colors.dark.tabIconDefault;

export const borderColor: string = "#656569";

export const inputBackgroundColor: string = "#333336";

export const modalBackgroundColor: string = "#232323";

export const headerBackgoundColor: string = "#191919";

export const underlayColor: string = colors.light.background + "50";

export default colors;
