import React from "react";
import { StyleSheet, View } from "react-native";
import Text from "../atomics/text";
import SvgUri from "react-native-svg-uri";
import { svgAssests } from "@/constants/assests";

export function SearchWelcomeScreen(): React.JSX.Element {
  return (
    <View style={styles.wrapper}>
      <SvgUri svgXmlData={svgAssests.sparkles} width={100} height={100} />
      <Text style={styles.title}>Hey! What's up?</Text>
      <Text style={styles.description}>
        Type something in top search bar and see the magic!
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    gap: 6,
    opacity: 0.85,
  },
  title: {
    fontFamily: "bold",
    fontSize: 18,
  },
  description: {
    textAlign: "center",
    width: "60%",
    opacity: 0.8,
  },
});
