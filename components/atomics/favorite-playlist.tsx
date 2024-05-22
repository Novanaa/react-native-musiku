import { svgAssests } from "@/constants/assests";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import SvgUri from "react-native-svg-uri";
import Text from "./text";
import { borderColor } from "@/constants/colors";

export default function FavoritePlaylist(): React.JSX.Element {
  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.6}>
      <View style={styles.headerWrapper}>
        <SvgUri svgXmlData={svgAssests.heart} width={38} height={38} />
        <View>
          <Text style={styles.title} numberOfLines={1}>
            My Favorite Songs
          </Text>
          <Text style={styles.description} numberOfLines={1}>
            {/* Placeholder for count songs */}
            10 Songs
          </Text>
        </View>
      </View>
      <View>
        <SvgUri svgXmlData={svgAssests.arrowRight} width={17} height={17} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
    borderBottomColor: borderColor,
    borderBottomWidth: 0.5,
    paddingVertical: 12,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    opacity: 0.85,
  },
  headerWrapper: {
    gap: 10,
    alignItems: "center",
    flexDirection: "row",
    width: "75%",
  },
  title: {
    fontFamily: "medium",
    fontSize: 16,
  },
  description: {
    fontSize: 12,
    opacity: 0.8,
  },
});
