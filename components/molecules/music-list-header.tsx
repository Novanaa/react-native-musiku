import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import Text from "../atomics/text";
import assests from "@/constants/assests";
import { borderColor } from "@/constants/colors";

export default function MusicListHeader(): React.JSX.Element {
  return (
    <>
      <View style={styles.wrapper}>
        <Text style={styles.textHeader}>Play some music!</Text>
        <TouchableOpacity activeOpacity={0.6}>
          <Image source={assests.icons.listOptions} alt="options" />
        </TouchableOpacity>
      </View>
      <View style={styles.bottomBorder}></View>
    </>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingTop: 17,
    paddingBottom: 12,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  bottomBorder: {
    borderBottomColor: borderColor,
    height: 1,
    borderWidth: 0.5,
  },
  textHeader: {
    fontFamily: "medium",
    fontSize: 13,
  },
});
