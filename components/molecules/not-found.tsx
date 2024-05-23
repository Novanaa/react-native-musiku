import React from "react";
import Text from "../atomics/text";
import { StyleSheet, TouchableOpacity, View, Image } from "react-native";
import assests from "@/constants/assests";
import colors from "@/constants/colors";
import getPermission from "@/utils/permission";
import { RefreshMusic, useMusicStore } from "@/stores/music";
import { RefreshFolder, useFolderStore } from "@/stores/folder";
import BoxOpenSVG from "@/assets/images/box-open.svg";
import InboxEmptySVG from "@/assets/images/inbox-empty.svg";

export function MusicNotDetected(): React.JSX.Element {
  const refreshMusic: RefreshMusic = useMusicStore((state) => state.refresh);
  const refreshFolder: RefreshFolder = useFolderStore((state) => state.refresh);

  return (
    <View style={musicNotDetectedStyles.container}>
      <Image
        source={assests.images.musicDisc}
        style={musicNotDetectedStyles.image}
      />
      <Text style={musicNotDetectedStyles.messege}>
        Music Not Detected, Are You Ready to Listen Your Favorite Music?
      </Text>
      <TouchableOpacity
        style={musicNotDetectedStyles.cta}
        activeOpacity={0.6}
        onPress={() => getPermission(refreshMusic, refreshFolder)}
      >
        <Text>Give Permission</Text>
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

export function EmptyMusic(): React.JSX.Element {
  return (
    <View style={emptyMusicStyles.container}>
      <View style={{ top: 10 }}>
        <BoxOpenSVG width={110} height={110} fill="#FEFEFE" />
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

export function EmptyPlaylist(): React.JSX.Element {
  return (
    <View style={emptyPlaylistStyles.container}>
      <InboxEmptySVG width={150} height={150} />
      <Text style={emptyPlaylistStyles.title}>
        Opps!, seems like empty here
      </Text>
      <Text style={emptyPlaylistStyles.description}>
        If you like you can make a playlist by click plus circle button in the
        top
      </Text>
      <TouchableOpacity activeOpacity={0.6} style={emptyPlaylistStyles.button}>
        <Text style={emptyPlaylistStyles.buttonText}>Create One!</Text>
      </TouchableOpacity>
    </View>
  );
}

const emptyPlaylistStyles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    opacity: 0.85,
  },
  title: {
    marginTop: 8,
    fontFamily: "medium",
    fontSize: 15.5,
  },
  description: {
    textAlign: "center",
    width: "70%",
    opacity: 0.8,
  },
  button: {
    top: 10,
  },
  buttonText: {
    fontFamily: "bold",
    borderBottomColor: colors.dark.text,
    borderBottomWidth: 1,
  },
});

const musicNotDetectedStyles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    gap: 10,
    opacity: 0.85,
  },
  messege: {
    textAlign: "center",
    width: "70%",
    opacity: 0.8,
  },
  image: {
    width: 125,
    height: 125,
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
