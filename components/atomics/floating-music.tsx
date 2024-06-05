import React from "react";
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
  AppState,
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
import { handlePause } from "@/utils/music-player";
import playMusic, { playNextMusic, playPrevMusic } from "@/utils/play-music";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import MusicPlayer from "./music-player";
import MusicOptions from "./music-options";

interface PlayButtonProps {
  playerDrawerRef: React.MutableRefObject<BottomSheetModalMethods | null>;
}

export default function FloatingMusic(): React.JSX.Element {
  const playerDrawerRef: React.MutableRefObject<BottomSheetModalMethods | null> =
    React.useRef<BottomSheetModalMethods | null>(null);
  const musicOptionsDrawerRef: React.MutableRefObject<BottomSheetModalMethods | null> =
    React.useRef<BottomSheetModalMethods | null>(null);
  const currentMusicPlayed: CurrentMusicPlayed = usePlayerStore((state) =>
    JSON.parse(state.currentMusicPlayed)
  );
  const isDisabled: boolean = !currentMusicPlayed;
  const filename: string =
    currentMusicPlayed?.music.filename || "What do you like to play?";
  const parsedDuration: string | null = parseDuration(
    String(currentMusicPlayed?.music.duration)
  );
  const modificationTime: string | null =
    new Date(
      currentMusicPlayed?.music.modificationTime as number
    ).toDateString() || null;

  const musicDescription: string = currentMusicPlayed
    ? `${modificationTime} - ${parsedDuration}`
    : "No music audio history provided!";

  const disabledStyles: StyleProp<ViewStyle> = {
    opacity: isDisabled ? 0.55 : 1,
  };

  return (
    <>
      <TouchableOpacity
        style={styles.container}
        activeOpacity={0.9}
        onPress={() => {
          if (currentMusicPlayed) playerDrawerRef.current?.present();
        }}
      >
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
              style={disabledStyles}
              disabled={isDisabled}
              icon={<PrevMusicSVG width={23} height={23} />}
              onPress={() => {
                playPrevMusic(currentMusicPlayed.music);
                playerDrawerRef.current?.present();
              }}
            />
            <PlayButton playerDrawerRef={playerDrawerRef} />
            <IconButton
              onPress={() => {
                playNextMusic(currentMusicPlayed.music);
                playerDrawerRef.current?.present();
              }}
              style={disabledStyles}
              disabled={isDisabled}
              icon={<NextMusicSVG width={23} height={23} />}
            />
          </View>
        </View>
      </TouchableOpacity>
      <MusicOptions
        modalRef={musicOptionsDrawerRef}
        music={currentMusicPlayed?.music}
      />
      <MusicPlayer
        modalRef={playerDrawerRef}
        musicOptionsRef={musicOptionsDrawerRef}
      />
    </>
  );
}

export function PlayButton(props: PlayButtonProps): React.JSX.Element {
  const setCurrentMusicPlayed: SetCurrentMusicPlayed = usePlayerStore(
    (state) => state.setCurrentMusicPlayed
  );
  const currentMusicPlayed: CurrentMusicPlayed = usePlayerStore((state) =>
    JSON.parse(state.currentMusicPlayed)
  );
  const soundObject: SoundObject | null = usePlayerStore(
    (state) => state.soundObject
  );
  const isDisabled: boolean = !currentMusicPlayed;
  const isControllerDisabled: boolean =
    soundObject?.status.isBuffering || !soundObject?.status.isLoaded;
  const disabledStyles: StyleProp<ViewStyle> = {
    opacity: isDisabled ? 0.55 : 1,
  };

  React.useEffect(() => {
    if (AppState.currentState == "background")
      setCurrentMusicPlayed({
        music: currentMusicPlayed.music,
        currentDuration: soundObject?.status.positionMillis as number,
      });
  }, [AppState.currentState]);

  return soundObject?.status.isPlaying && !soundObject?.status.didJustFinish ? (
    <IconButton
      style={disabledStyles}
      disabled={isDisabled || isControllerDisabled}
      icon={
        <PauseSVG
          width={23}
          height={23}
          onPress={() => handlePause(soundObject?.status)}
        />
      }
    />
  ) : (
    <IconButton
      style={disabledStyles}
      disabled={isDisabled || isControllerDisabled}
      icon={<PlaySVG width={23} height={23} />}
      onPress={() => {
        props.playerDrawerRef.current?.present();
        playMusic(currentMusicPlayed, {
          positionMillis: currentMusicPlayed.currentDuration,
        });
      }}
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
