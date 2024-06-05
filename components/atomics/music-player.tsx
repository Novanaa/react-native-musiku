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
import { CurrentMusicPlayed, SoundObject } from "@/interfaces/audio";
import { usePlayerStore } from "@/stores/player";
import PauseSVG from "@/assets/icons/pause.svg";
import { handlePause } from "@/utils/music-player";
import playMusic, { playNextMusic, playPrevMusic } from "@/utils/play-music";

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
  const currentMusicPlayed: CurrentMusicPlayed = usePlayerStore((state) =>
    JSON.parse(state.currentMusicPlayed)
  );
  const addToPlaylistDrawerRef: React.MutableRefObject<BottomSheetModalMethods | null> =
    React.useRef<BottomSheetModalMethods | null>(null);
  const { dismissAll }: BottomSheetModalContextType = useBottomSheetModal();
  const musicDuration: string = parseDuration(
    String(currentMusicPlayed?.music.duration)
  );

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
            {/* Placeholder for right now!! */}
            <Text style={styles.musicMetadataDescription}>{musicDuration}</Text>
            <Slider
              style={styles.slider}
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
  const soundObject: SoundObject = usePlayerStore(
    (state) => state.soundObject
  ) as SoundObject;
  const currentMusicPlayed: CurrentMusicPlayed = usePlayerStore((state) =>
    JSON.parse(state.currentMusicPlayed)
  );
  const isDisabled: boolean =
    soundObject?.status.isBuffering || !soundObject?.status.isLoaded;
  const disabledStyles: StyleProp<ViewStyle> = {
    opacity: isDisabled ? 0.55 : 1,
  };

  return (
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
        disabled={isDisabled}
        style={disabledStyles}
      />
      <View style={styles.musicControllerWrapper}>
        <IconButton
          disabled={isDisabled}
          style={disabledStyles}
          icon={<SkipBackSVG width={40} height={40} />}
          onPress={() => playPrevMusic(currentMusicPlayed.music)}
        />
        {soundObject?.status.isPlaying && !soundObject?.status.didJustFinish ? (
          <IconButton
            disabled={isDisabled}
            style={disabledStyles}
            icon={<PauseSVG width={40} height={40} />}
            onPress={() => handlePause(soundObject.status)}
          />
        ) : (
          <IconButton
            disabled={isDisabled}
            style={disabledStyles}
            icon={<PlaySVG width={40} height={40} />}
            onPress={() =>
              playMusic(currentMusicPlayed, {
                positionMillis: currentMusicPlayed.currentDuration,
              })
            }
          />
        )}
        <IconButton
          disabled={isDisabled}
          style={disabledStyles}
          icon={<SkipForwardSVG width={40} height={40} />}
          onPress={() => playNextMusic(currentMusicPlayed.music)}
        />
      </View>
      <IconButton
        disabled={isDisabled}
        style={disabledStyles}
        icon={<ListOptionsSVG width={22.5} height={22.5} />}
        onPress={() => props.addToPlaylistDrawerRef.current?.present()}
      />
    </View>
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
