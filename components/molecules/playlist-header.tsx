import React from "react";
import { StyleSheet, View } from "react-native";
import Text from "../atomics/text";
import { IconButton } from "../atomics/button";
import { svgAssests } from "@/constants/assests";
import SearchBar from "../atomics/search-bar";
import { borderColor } from "@/constants/colors";
import SvgUri from "react-native-svg-uri";

export default function PlaylistHeader(): React.JSX.Element {
  return (
    <View style={styles.container}>
      <View style={styles.headerWrapper}>
        <View style={styles.titleWrapper}>
          <SvgUri svgXmlData={svgAssests.sparkles} width={22} height={22} />
          <Text style={styles.title}>Playlist</Text>
        </View>
        <View style={styles.iconWrapper}>
          <IconButton icon={svgAssests.plusCircle} width={26} height={26} />
          <IconButton icon={svgAssests.heart} width={26} height={26} />
          <IconButton icon={svgAssests.musicOptions} width={26} height={26} />
        </View>
      </View>
      <View style={styles.searchWrapper}>
        {/* Change it later on! */}
        <SearchBar onChangeText={(text) => console.log(console.log(text))} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    top: 60,
    paddingBottom: 15,
  },
  headerWrapper: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    borderBottomColor: borderColor,
    borderBottomWidth: 0.5,
    paddingBottom: 15,
  },
  titleWrapper: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },
  searchWrapper: {
    top: 15,
  },
  iconWrapper: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    top: 5,
  },
  title: {
    fontFamily: "bold",
    fontSize: 19,
  },
});
