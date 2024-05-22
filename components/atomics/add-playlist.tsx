import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import SvgUri from "react-native-svg-uri";
import Text from "./text";
import { svgAssests } from "@/constants/assests";

export function AddPlaylist(): React.JSX.Element {
  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.6}>
      <View style={styles.headerWrapper}>
        <SvgUri svgXmlData={svgAssests.plusCircle} width={30} height={30} />
        <View>
          <Text style={styles.title} numberOfLines={1}>
            Add Playlist
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
    paddingVertical: 12,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    opacity: 0.85,
  },
  headerWrapper: {
    gap: 7,
    alignItems: "center",
    flexDirection: "row",
    width: "75%",
  },
  title: {
    fontFamily: "medium",
    fontSize: 15,
  },
});
