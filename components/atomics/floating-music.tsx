import React from "react";
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import Text from "./text";
import { backgroundColor, borderColor } from "@/constants/colors";
import { borderRadius } from "@/constants/styles";
import MusicSVG from "@/assets/icons/music.svg";
import { IconButton } from "./button";
import PlaySVG from "@/assets/icons/play.svg";
import NextMusicSVG from "@/assets/icons/next-music.svg";
import PrevMusicSVG from "@/assets/icons/prev-music.svg";
import parseDuration from "@/utils/parse-duration";
import { SetCurrentMusicPlayed, usePlayerStore } from "@/stores/player";
import { CurrentMusicPlayed, SoundObject } from "@/interfaces/audio";
import PauseSVG from "@/assets/icons/pause.svg";
import { pause } from "@/utils/music-player";
import playMusic from "@/utils/play-music";
import { AVPlaybackStatusSuccess } from "expo-av";
import getPlaybackStatus from "@/utils/get-playback-status";

export default function FloatingMusic(): React.JSX.Element {
  const currentMusicPlayed: CurrentMusicPlayed = usePlayerStore((state) =>
    JSON.parse(state.currentMusicPlayed)
  );
  const isDisabled: boolean = React.useMemo(
    () => !currentMusicPlayed,
    [currentMusicPlayed]
  );
  const filename: string = React.useMemo(
    () => currentMusicPlayed?.music.filename || "What do you like to play?",
    [currentMusicPlayed]
  );
  const parsedDuration: string | null = React.useMemo(
    () => parseDuration(String(currentMusicPlayed?.music.duration)),
    [currentMusicPlayed]
  );
  const modificationTime: string | null = React.useMemo(
    () =>
      new Date(
        currentMusicPlayed?.music.modificationTime as number
      ).toDateString() || null,
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
          <IconButton
            style={{
              opacity: isDisabled ? 0.55 : 1,
            }}
            disabled={isDisabled}
            icon={<PrevMusicSVG width={23} height={23} />}
          />
          <PlayButton />
          <IconButton
            style={{
              opacity: isDisabled ? 0.55 : 1,
            }}
            disabled={isDisabled}
            icon={<NextMusicSVG width={23} height={23} />}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}

export function PlayButton(): React.JSX.Element {
  const setCurrentMusicPlayed: SetCurrentMusicPlayed = usePlayerStore(
    (state) => state.setCurrentMusicPlayed
  );
  const [status, setStatus] = React.useState<AVPlaybackStatusSuccess | null>(
    null
  );
  const currentMusicPlayed: CurrentMusicPlayed = usePlayerStore((state) =>
    JSON.parse(state.currentMusicPlayed)
  );
  const soundObject: SoundObject | null = usePlayerStore(
    (state) => state.soundObject
  );
  const isDisabled: boolean = React.useMemo(
    () => !currentMusicPlayed,
    [currentMusicPlayed]
  );
  const disabledStyles: StyleProp<ViewStyle> = React.useMemo(
    () => ({
      opacity: isDisabled ? 0.55 : 1,
    }),
    [isDisabled]
  );

  const handlePause: () => void = React.useCallback(() => {
    pause(soundObject as SoundObject);
    setCurrentMusicPlayed({
      music: currentMusicPlayed.music,
      currentDuration: status?.positionMillis as number,
    });
  }, [soundObject, currentMusicPlayed]);

  React.useEffect(() => {
    getPlaybackStatus((state) => setStatus(state));
  }, [soundObject]);

  return status?.isPlaying ? (
    <IconButton
      style={disabledStyles}
      disabled={isDisabled}
      icon={<PauseSVG width={23} height={23} onPress={() => handlePause()} />}
    />
  ) : (
    <IconButton
      style={disabledStyles}
      disabled={isDisabled}
      icon={<PlaySVG width={23} height={23} />}
      onPress={() =>
        playMusic(currentMusicPlayed, {
          positionMillis: currentMusicPlayed.currentDuration,
        })
      }
    />
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
