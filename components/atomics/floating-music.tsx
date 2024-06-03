import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Text from "./text";
import { backgroundColor, borderColor } from "@/constants/colors";
import { borderRadius } from "@/constants/styles";
import MusicSVG from "@/assets/icons/music.svg";
import { IconButton } from "./button";
import PlaySVG from "@/assets/icons/play.svg";
import NextMusicSVG from "@/assets/icons/next-music.svg";
import PrevMusicSVG from "@/assets/icons/prev-music.svg";
import parseDuration from "@/utils/parse-duration";
import { CurrentMusicPlayed, usePlayerStore } from "@/stores/player";

export default function FloatingMusic(): React.JSX.Element {
  const currentMusicPlayed: CurrentMusicPlayed = usePlayerStore(
    (state) => state.currentMusicPlayed
  );
  const filename: string = React.useMemo(
    () => currentMusicPlayed?.filename || "What do you like to play?",
    [currentMusicPlayed]
  )!;
  const parsedDuration: string | null = React.useMemo(
    () => parseDuration(String(currentMusicPlayed?.duration)),
    [currentMusicPlayed]
  );
  const modificationTime: string | null = React.useMemo(
    () =>
      new Date(currentMusicPlayed?.modificationTime!).toDateString() || null,
    [currentMusicPlayed]
  );
  const musicDescription: string = currentMusicPlayed
    ? `${modificationTime} - ${parsedDuration}`
    : "No music audio history provided!";

  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.9}>
      <View style={styles.wrapper}>
        <View style={styles.musicHeaderWrapper}>
          <MusicSVG width={29} height={29} />
          <View style={styles.musicMetadataWrapper}>
            <Text style={styles.musicTitle} numberOfLines={1}>
              {filename}
            </Text>
            <Text style={styles.duration} numberOfLines={1}>
              {musicDescription}
            </Text>
          </View>
        </View>
        <View style={styles.musicActionsWrapper}>
          <IconButton icon={<NextMusicSVG width={23} height={23} />} />
          <IconButton icon={<PlaySVG width={23} height={23} />} />
          <IconButton icon={<PrevMusicSVG width={23} height={23} />} />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  wrapper: {
    position: "absolute",
    bottom: 65,
    paddingHorizontal: 18,
    backgroundColor: backgroundColor,
    width: "95%",
    paddingVertical: 8.5,
    borderColor,
    borderRadius,
    borderWidth: 0.5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  musicHeaderWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  musicMetadataWrapper: {
    gap: 2,
    width: "70%",
  },
  musicTitle: {
    fontFamily: "medium",
    fontSize: 14,
  },
  duration: {
    fontSize: 11.5,
    opacity: 0.8,
  },
  musicActionsWrapper: {
    gap: 8,
    flexDirection: "row",
  },
});
