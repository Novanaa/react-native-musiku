import React from "react";
import Text from "../atomics/text";
import { Image, StyleSheet, View } from "react-native";
import assests, { svgAssests } from "@/constants/assests";
import SvgUri from "react-native-svg-uri";
import colors from "@/constants/colors";

export function MusicNotDetected(): React.JSX.Element {
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

export function EmptyMusic(): React.JSX.Element {
  return (
    <View style={emptyMusicStyles.container}>
      <View style={{ top: 10 }}>
        <SvgUri
          svgXmlData={svgAssests.boxOpen}
          width={110}
          height={110}
          fill="#FEFEFE"
        />
      </View>
      <Text style={emptyMusicStyles.headerText}>
        Got any tunes on your phone?
      </Text>
      <Text style={emptyMusicStyles.messege}>
        How about we add some tunes to your phone? It's feeling a bit too quiet
        in here!
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
    borderBottomColor: colors.light.background,
    borderBottomWidth: 1,
    paddingBottom: 1,
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

const emptyMusicStyles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    gap: 3,
    opacity: 0.85,
  },
  headerText: {
    fontFamily: "bold",
    fontSize: 16,
  },
  messege: {
    textAlign: "center",
    width: "80%",
    opacity: 0.8,
  },
});
