import { svgAssests } from "@/constants/assests";
import colors, { inputBackgroundColor } from "@/constants/colors";
import { borderRadius } from "@/constants/styles";
import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import SvgUri from "react-native-svg-uri";

export default function SearchBar(): React.JSX.Element {
  return (
    <View style={styles.wrapper}>
      <View style={styles.searchIcon}>
        <SvgUri svgXmlData={svgAssests.search} />
      </View>
      <TextInput
        style={styles.searchInput}
        placeholder="What are you looking for?"
        placeholderTextColor={colors.dark.text}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  searchInput: {
    fontFamily: "medium",
    width: "100%",
    backgroundColor: inputBackgroundColor,
    padding: 8,
    paddingHorizontal: 13,
    paddingLeft: 35,
    fontSize: 13,
    color: colors.dark.text,
    borderRadius,
  },
  searchIcon: {
    position: "absolute",
    zIndex: 1,
    left: 7,
    transform: [{ scale: 0.8 }],
  },
});
