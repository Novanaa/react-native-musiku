import React from "react";
import Text from "../atomics/text";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { Router, useRouter } from "expo-router";
import assests from "@/constants/assests";

export function MusicNotDetected(): React.JSX.Element {
  const router: Router = useRouter();
  return (
    <View style={styles.container}>
      <Image
        source={assests.images.musicDisc}
        alt="music-not-detected"
        style={styles.image}
      />
      <Text style={styles.messege}>
        Music Not Detected, Are You Ready to Listen Your Favorite Music?
      </Text>
      <TouchableOpacity onPress={() => router.push("/scan")}>
        <Text style={styles.cta}>Scan Your Music</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    gap: 10,
    opacity: 0.85,
  },
  image: {
    width: 110,
    height: 110,
  },
  messege: {
    textAlign: "center",
    width: "80%",
    opacity: 0.8,
  },
  cta: {
    fontFamily: "bold",
  },
});
