import {
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableHighlight,
  TouchableHighlightProps,
  View,
} from "react-native";
import React from "react";
import Drawer, { DrawerProps } from "../atomics/drawer";
import Text from "./text";
import { destructiveColor, underlayColor } from "@/constants/colors";
import { borderRadius } from "@/constants/styles";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import {
  MusicOptionsAddToPlaylist,
  MusicOptionsInformation,
} from "./music-options-actions";
import * as MediaLibrary from "expo-media-library";
import { SvgProps } from "react-native-svg";
import PlaySVG from "@/assets/icons/play.svg";
import HeartSVG from "@/assets/icons/heart.svg";
import InfoSVG from "@/assets/icons/info.svg";
import TrashSVG from "@/assets/icons/trash.svg";
import AlbumSVG from "@/assets/icons/album.svg";
import { RefreshFavoritesMusic, useFavoritesMusic } from "@/stores/favorites";
import addMusicFavorites from "@/utils/add-favorites";
import removeFavorites from "@/utils/remove-favorites";
import isMusicFavorited from "@/utils/is-music-favorited";
import Favorites from "@/interfaces/favorites";
import deleteMusic from "@/utils/delete-music";
import { useBottomSheetModal } from "@gorhom/bottom-sheet";
import { BottomSheetModalContextType } from "@gorhom/bottom-sheet/lib/typescript/contexts/modal/external";
import playMusic from "@/utils/music-player";

interface MusicOptionsListProps extends TouchableHighlightProps {
  icon: React.FC<SvgProps>;
  title: string;
  textStyle?: StyleProp<TextStyle>;
  fill?: string;
}

interface MusicOptionsProps extends DrawerProps {
  music: MediaLibrary.Asset;
}

export default function MusicOptions(
  props: MusicOptionsProps
): React.JSX.Element {
  const { dismissAll }: BottomSheetModalContextType = useBottomSheetModal();
  const favoritesMusic: Favorites = JSON.parse(
    useFavoritesMusic((state) => state.favorites)
  );
  const isMusicFavoritedState: boolean = isMusicFavorited(
    favoritesMusic,
    props.music
  );
  const refreshFavoritesMusic: RefreshFavoritesMusic = useFavoritesMusic(
    (state) => state.refresh
  );
  const musicInformationDrawerRef: React.MutableRefObject<BottomSheetModalMethods | null> =
    React.useRef(null);
  const addToPlaylistDrawerRef: React.MutableRefObject<BottomSheetModalMethods | null> =
    React.useRef(null);

  return (
    <>
      <Drawer
        modalRef={props.modalRef}
        snapPoints={["40%"]}
        stackBehavior="push"
      >
        <View style={styles.wrapper}>
          <MusicOptionsList
            title="Play music"
            icon={PlaySVG}
            onPress={() => {
              playMusic({ music: props.music, currentDuration: 0 });
              dismissAll();
            }}
          />
          <MusicOptionsList
            title="Add to playlist"
            icon={AlbumSVG}
            onPress={() => addToPlaylistDrawerRef.current?.present()}
          />
          {!isMusicFavoritedState ? (
            <MusicOptionsList
              title="Add to favorites"
              icon={HeartSVG}
              onPress={() => {
                addMusicFavorites(props.music);
                refreshFavoritesMusic();
                dismissAll();
              }}
            />
          ) : (
            <MusicOptionsList
              title="Remove from favorites"
              icon={HeartSVG}
              onPress={() => {
                removeFavorites(props.music);
                refreshFavoritesMusic();
                dismissAll();
              }}
            />
          )}
          <MusicOptionsList
            title="Music information"
            icon={InfoSVG}
            onPress={() => musicInformationDrawerRef.current?.present()}
          />
          <MusicOptionsList
            title="Delete music"
            icon={TrashSVG}
            fill={destructiveColor}
            textStyle={{
              color: destructiveColor,
            }}
            onPress={() => {
              deleteMusic(props.music);
              dismissAll();
            }}
          />
        </View>
      </Drawer>
      <MusicOptionsInformation
        modalRef={musicInformationDrawerRef}
        music={props.music}
      />
      <MusicOptionsAddToPlaylist
        modalRef={addToPlaylistDrawerRef}
        music={props.music}
      />
    </>
  );
}

export function MusicOptionsList(
  props: MusicOptionsListProps
): React.JSX.Element {
  return (
    <TouchableHighlight
      style={styles.listWrapper}
      onPress={props.onPress}
      underlayColor={underlayColor}
    >
      <>
        <props.icon width={22} height={22} fill={props.fill} />
        <Text style={[styles.listTitle, props.textStyle]}>{props.title}</Text>
      </>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: 2,
    marginHorizontal: 8,
  },
  listWrapper: {
    opacity: 0.9,
    gap: 10,
    flexDirection: "row",
    alignItems: "center",
    borderRadius,
    paddingVertical: 11,
    paddingHorizontal: 7.5,
  },
  listTitle: {
    fontSize: 16,
    fontFamily: "medium",
  },
});
