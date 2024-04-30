import React from "react";
import { StyleSheet, View } from "react-native";
import Text from "../atomics/text";
import assests from "@/constants/assests";
import { IconButton } from "../atomics/button";
import { Router, useRouter } from "expo-router";

export default function Header(): React.JSX.Element {
  const router: Router = useRouter();
  return (
    <View style={styles.container}>
      <Text style={styles.appName}>Musiku</Text>
      <IconButton
        icon={assests.icons.scanMusic}
        alt="Scan your music"
        onPress={() => router.push("/scan")}
      />
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
});
