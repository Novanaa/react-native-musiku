const tintColorLight: string = "#2f95dc";
const tintColorDark: string = "#fff";
const lightBackgroundColor: string = "#FEFEFE";
const darkBackgroundColor: string = "#121212";

export default {
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
