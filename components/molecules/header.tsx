import React from "react";
import { StyleSheet, View } from "react-native";
import Text from "../atomics/text";

export default function Header(): React.JSX.Element {
  return (
    <View style={styles.container}>
      <Text style={styles.appName}>Musiku</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 70,
    paddingBottom: 20,
    justifyContent: "space-between",
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
  },
  appName: {
    fontFamily: "bold",
    fontSize: 18,
  },
  iconWrapper: {
    flexDirection: "row",
    gap: 10,
  },
});
