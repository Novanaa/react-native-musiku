import React from "react";
import Text from "../atomics/text";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { Router, useRouter } from "expo-router";
import assests from "@/constants/assests";

export function MusicNotDetected(): React.JSX.Element {
  const router: Router = useRouter();
  return (
    <View style={musicNotDetectedStyles.container}>
      <Image
        source={assests.images.musicDisc}
        alt="music-not-detected"
        style={musicNotDetectedStyles.image}
      />
      <Text style={musicNotDetectedStyles.messege}>
        Music Not Detected, Are You Ready to Listen Your Favorite Music?
      </Text>
      <TouchableOpacity onPress={() => router.push("/scan")}>
        <Text style={musicNotDetectedStyles.cta}>Scan Your Music</Text>
      </TouchableOpacity>
    </View>
  );
}

export function MusicSearchNotFound(): React.JSX.Element {
  return (
    <View style={musicSearchNotFoundStyles.container}>
      <Text style={musicSearchNotFoundStyles.notFoundText}>404</Text>
      <Text style={musicSearchNotFoundStyles.headerText}>
        Not results found
      </Text>
      <Text style={musicSearchNotFoundStyles.messege}>
        Requested music cannot be found, try searching something else.
      </Text>
    </View>
  );
}

const musicNotDetectedStyles = StyleSheet.create({
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

const musicSearchNotFoundStyles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    gap: 5,
    opacity: 0.85,
  },
  notFoundText: {
    fontFamily: "extraBold",
  },
  headerText: {
    fontFamily: "medium",
    fontSize: 16,
  },
  messege: {
    textAlign: "center",
    width: "70%",
    opacity: 0.8,
  },
});
