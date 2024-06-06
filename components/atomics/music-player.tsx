import React from "react";
import Drawer, { DrawerProps, DrawerWrapper } from "./drawer";
import * as MediaLibrary from "expo-media-library";
import colors, { backgroundColor, borderColor } from "@/constants/colors";
import {
  BackHandler,
  Image,
  NativeEventSubscription,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import ArrowDownSVG from "@/assets/icons/arrow-down.svg";
import MusicOptionsSVG from "@/assets/icons/music-options.svg";
import { IconButton } from "./button";
import { useBottomSheetModal } from "@gorhom/bottom-sheet";
import { BottomSheetModalContextType } from "@gorhom/bottom-sheet/lib/typescript/contexts/modal/external";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import Text from "./text";
import { borderRadius } from "@/constants/styles";
import Slider from "@react-native-community/slider";
import parseDuration from "@/utils/parse-duration";
import PlaySVG from "@/assets/icons/play.svg";
import SkipForwardSVG from "@/assets/icons/skip-forward.svg";
import SkipBackSVG from "@/assets/icons/skip-back.svg";
import ArrowPathSVG from "@/assets/icons/arrow-path.svg";
import ListOptionsSVG from "@/assets/icons/list-options.svg";
import { MusicOptionsAddToPlaylist } from "./music-options-actions";
import OutlineFavoritesSVG from "@/assets/icons/outline-heart.svg";
import FavoritesSVG from "@/assets/icons/heart.svg";
import Favorites from "@/interfaces/favorites";
import { RefreshFavoritesMusic, useFavoritesMusic } from "@/stores/favorites";
import isMusicFavorited from "@/utils/is-music-favorited";
import addMusicFavorites from "@/utils/add-favorites";
import removeFavorites from "@/utils/remove-favorites";
import { CurrentMusicPlayed } from "@/interfaces/audio";
import { usePlayerStore } from "@/stores/player";
import PauseSVG from "@/assets/icons/pause.svg";
import TrackSortMethod from "./track-sort-method";
import {
  PlaybackState,
  Progress,
  State,
  usePlaybackState,
  useProgress,
} from "react-native-track-player";
import playMusic, {
  pauseMusic,
  playNextMusic,
  playPrevMusic,
} from "@/utils/music-player";

interface MusicPlayerProps extends DrawerProps {
  musicOptionsRef: React.MutableRefObject<null | BottomSheetModalMethods>;
}

interface MusicPlayerFavoritesMusicButtonProps {
  music: MediaLibrary.Asset;
}

interface MusicPlayerControllerProps {
  addToPlaylistDrawerRef: React.MutableRefObject<null | BottomSheetModalMethods>;
}

export default function MusicPlayer(
  props: MusicPlayerProps
): React.JSX.Element {
  const playbackState: PlaybackState = usePlaybackState() as PlaybackState;
  const { position }: Progress = useProgress();
  const currentMusicPlayed: CurrentMusicPlayed = usePlayerStore((state) =>
    JSON.parse(state.currentMusicPlayed)
  );
  const addToPlaylistDrawerRef: React.MutableRefObject<BottomSheetModalMethods | null> =
    React.useRef<BottomSheetModalMethods | null>(null);
  const { dismissAll }: BottomSheetModalContextType = useBottomSheetModal();
  const parsedPosition: string = parseDuration(String(position));
  const musicDuration: string = parseDuration(
    String(currentMusicPlayed?.music.duration)
  );
  const isControllerDisabled: boolean =
    playbackState.state == State.Loading ||
    playbackState.state == State.Buffering;

  React.useEffect(() => {
    const backhandler: NativeEventSubscription = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        dismissAll();
        return true;
      }
    );

    return () => backhandler.remove();
  }, []);

  return (
    <>
      <Drawer
        modalRef={props.modalRef}
        activeOffsetY={[-1, 1]}
        failOffsetX={[-5, 5]}
        snapPoints={["100%"]}
        handleIndicatorStyle={{
          backgroundColor,
        }}
        backgroundStyle={{
          backgroundColor,
        }}
      >
        <DrawerWrapper style={styles.wrapper}>
          <View style={styles.playerHeaderWrapper}>
            <IconButton
              icon={<ArrowDownSVG width={26} height={26} />}
              onPress={() => dismissAll()}
            />
            <Text style={styles.headerTitle}>Musiku</Text>
            <IconButton
              icon={<MusicOptionsSVG width={26} height={26} />}
              onPress={() => props.musicOptionsRef.current?.present()}
            />
          </View>
          <View style={styles.placeholderWrapper}>
            <Image
              style={styles.placeholder}
              source={require("@/assets/images/music-player-placeholder.jpg")}
            />
          </View>
          <View style={styles.musicHeaderWrapper}>
            <View style={styles.musicMetadatWrapper}>
              <Text numberOfLines={1} style={styles.musicMetadataFilename}>
                {currentMusicPlayed?.music.filename}
              </Text>
              <Text numberOfLines={1} style={styles.musicMetadataDescription}>
                {`(${musicDuration}) - Unknown Artist - Unknown Album`}
              </Text>
            </View>
            <MusicPlayerFavoritesMusicButton
              music={currentMusicPlayed?.music}
            />
          </View>
          <View style={styles.sliderWrapper}>
            <Text style={styles.musicMetadataDescription}>
              {parsedPosition}
            </Text>
            <Slider
              disabled={isControllerDisabled}
              style={styles.slider}
              minimumValue={0}
              value={position}
              maximumValue={currentMusicPlayed.music.duration}
              minimumTrackTintColor={colors.dark.text}
              maximumTrackTintColor={colors.dark.text}
              thumbTintColor={colors.dark.text}
            />
            <Text style={styles.musicMetadataDescription}>{musicDuration}</Text>
          </View>
          <MusicPlayerController
            addToPlaylistDrawerRef={addToPlaylistDrawerRef}
          />
        </DrawerWrapper>
      </Drawer>
      <MusicOptionsAddToPlaylist
        stackBehavior="push"
        modalRef={addToPlaylistDrawerRef}
        music={currentMusicPlayed?.music}
      />
    </>
  );
}

export function MusicPlayerController(
  props: MusicPlayerControllerProps
): React.JSX.Element {
  const playbackState: PlaybackState = usePlaybackState() as PlaybackState;
  const { position }: Progress = useProgress();
  const trackSortMethodDrawerRef: React.MutableRefObject<BottomSheetModalMethods | null> =
    React.useRef<BottomSheetModalMethods | null>(null);
  const currentMusicPlayed: CurrentMusicPlayed = usePlayerStore((state) =>
    JSON.parse(state.currentMusicPlayed)
  );
  const isControllerDisabled: boolean =
    playbackState.state == State.Loading ||
    playbackState.state == State.Buffering;
  const disabledStyles: StyleProp<ViewStyle> = {
    opacity: isControllerDisabled ? 0.55 : 1,
  };

  const isEnded: boolean = playbackState.state == State.Ended;
  const isPlaying: boolean = playbackState.state == State.Playing;

  return (
    <>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: 20,
        }}
      >
        <IconButton
          icon={<ArrowPathSVG width={22.5} height={22.5} />}
          disabled={isControllerDisabled}
          onPress={() => trackSortMethodDrawerRef.current?.present()}
          style={disabledStyles}
        />
        <View style={styles.musicControllerWrapper}>
          <IconButton
            disabled={isControllerDisabled}
            style={disabledStyles}
            icon={<SkipBackSVG width={40} height={40} />}
            onPress={() => playPrevMusic(currentMusicPlayed.music)}
          />
          {isPlaying && !isEnded ? (
            <IconButton
              disabled={isControllerDisabled}
              style={disabledStyles}
              icon={<PauseSVG width={40} height={40} />}
              onPress={() => pauseMusic(position)}
            />
          ) : (
            <IconButton
              disabled={isControllerDisabled}
              style={disabledStyles}
              icon={<PlaySVG width={40} height={40} />}
              onPress={() => playMusic(currentMusicPlayed)}
            />
          )}
          <IconButton
            disabled={isControllerDisabled}
            style={disabledStyles}
            icon={<SkipForwardSVG width={40} height={40} />}
            onPress={() => playNextMusic(currentMusicPlayed.music)}
          />
        </View>
        <IconButton
          disabled={isControllerDisabled}
          style={disabledStyles}
          icon={<ListOptionsSVG width={22.5} height={22.5} />}
          onPress={() => props.addToPlaylistDrawerRef.current?.present()}
        />
      </View>
      <TrackSortMethod modalRef={trackSortMethodDrawerRef} />
    </>
  );
}

export function MusicPlayerFavoritesMusicButton(
  props: MusicPlayerFavoritesMusicButtonProps
): React.JSX.Element {
  const refreshFavoritesMusic: RefreshFavoritesMusic = useFavoritesMusic(
    (state) => state.refresh
  );
  const favoritesMusic: Favorites = useFavoritesMusic((state) =>
    JSON.parse(state.favorites)
  );
  const isMusicFavoritedState = React.useMemo(
    () => isMusicFavorited(favoritesMusic, props.music),
    [favoritesMusic]
  );

  return (
    <View>
      {isMusicFavoritedState ? (
        <IconButton
          icon={<FavoritesSVG width={25} height={25} />}
          onPress={() => {
            removeFavorites(props.music);
            refreshFavoritesMusic();
          }}
        />
      ) : (
        <IconButton
          icon={<OutlineFavoritesSVG width={25} height={25} />}
          onPress={() => {
            addMusicFavorites(props.music);
            refreshFavoritesMusic();
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    padding: 25,
    marginTop: 5,
  },
  playerHeaderWrapper: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  headerTitle: {
    fontFamily: "bold",
    fontSize: 15,
  },
  placeholderWrapper: {
    marginTop: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  placeholder: {
    borderRadius,
    borderColor,
    borderWidth: 1,
    width: "100%",
    height: 300,
    resizeMode: "cover",
  },
  musicHeaderWrapper: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginTop: 13,
  },
  musicMetadatWrapper: {
    width: "80%",
  },
  musicMetadataFilename: {
    fontFamily: "bold",
    fontSize: 18,
  },
  musicMetadataDescription: {
    fontSize: 11,
    left: 2,
  },
  sliderWrapper: {
    marginTop: 30,
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
  },
  slider: {
    width: "85%",
  },
  musicControllerWrapper: {
    flexDirection: "row",
    gap: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});
