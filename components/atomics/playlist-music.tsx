import React from "react";
import * as MediaLibrary from "expo-media-library";
import { borderRadius } from "@/constants/styles";
import MusicSVG from "@/assets/icons/music.svg";
import {
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableHighlight,
  TouchableHighlightProps,
  TouchableOpacity,
  View,
} from "react-native";
import Text from "./text";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import MusicOptionsSVG from "@/assets/icons/music-options.svg";
import { destructiveColor, underlayColor } from "@/constants/colors";
import Drawer, { DrawerProps } from "./drawer";
import { SvgProps } from "react-native-svg";
import { RefreshFavoritesMusic, useFavoritesMusic } from "@/stores/favorites";
import Favorites from "@/interfaces/favorites";
import addMusicFavorites from "@/utils/add-favorites";
import removeFavorites from "@/utils/remove-favorites";
import {
  MusicOptionsAddToPlaylist,
  MusicOptionsInformation,
} from "./music-options-actions";
import PlaySVG from "@/assets/icons/play.svg";
import AlbumSVG from "@/assets/icons/album.svg";
import HeartSVG from "@/assets/icons/heart.svg";
import InfoSVG from "@/assets/icons/info.svg";
import TrashSVG from "@/assets/icons/trash.svg";
import removeFromPlaylist from "@/utils/remove-from-playlist";
import { Playlist } from "@/interfaces/playlist";
import { useBottomSheetModal } from "@gorhom/bottom-sheet";
import { BottomSheetModalContextType } from "@gorhom/bottom-sheet/lib/typescript/contexts/modal/external";
import { RefreshPlaylist, usePlaylistStore } from "@/stores/playlist";
import playMusic from "@/utils/play-music";
import parseDuration from "@/utils/parse-duration";
import MusicPlayer from "./music-player";

interface PlaylistMusicProps extends TouchableHighlightProps {
  musicItem: MediaLibrary.Asset;
  playlistItem: Playlist;
}

interface PlaylistMusicOptionsProps extends DrawerProps {
  playlistItem: Playlist;
  music: MediaLibrary.Asset;
}

interface PlaylistMusicOptionsListProps extends TouchableHighlightProps {
  icon: React.FC<SvgProps>;
  title: string;
  textStyle?: StyleProp<TextStyle>;
  fill?: string;
}

function PlaylistMusic(props: PlaylistMusicProps): React.JSX.Element {
  const optionsDrawerRef: React.MutableRefObject<null | BottomSheetModalMethods> =
    React.useRef(null);
  const playerDrawerRef: React.MutableRefObject<null | BottomSheetModalMethods> =
    React.useRef(null);

  const musicDuration: string = React.useMemo(
    () => parseDuration(String(props.musicItem.duration)),
    [props.musicItem]
  );

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.6}
        style={playlistMusicStyles.container}
        onPress={() => {
          playerDrawerRef.current?.present();
          playMusic({ music: props.musicItem, currentDuration: 0 });
        }}
      >
        <View style={playlistMusicStyles.wrapper}>
          <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
            <MusicSVG width={28} height={28} />
            <View style={playlistMusicStyles.metadata}>
              <Text style={playlistMusicStyles.title} numberOfLines={1}>
                {props.musicItem.filename}
              </Text>
              <Text numberOfLines={1} style={playlistMusicStyles.description}>
                {`(${musicDuration}) - Unknown Artist - Unknown Album`}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => optionsDrawerRef.current?.present()}
            style={{ width: 30, height: 30 }}
          >
            <MusicOptionsSVG />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
      <MusicPlayer
        modalRef={playerDrawerRef}
        music={props.musicItem}
        musicOptionsRef={optionsDrawerRef}
      />
      <PlaylistMusicOptions
        modalRef={optionsDrawerRef}
        music={props.musicItem}
        playlistItem={props.playlistItem}
      />
    </>
  );
}

export function PlaylistMusicOptions(
  props: PlaylistMusicOptionsProps
): React.JSX.Element {
  const refreshPlaylist: RefreshPlaylist = usePlaylistStore(
    (state) => state.refresh
  );
  const { dismissAll }: BottomSheetModalContextType = useBottomSheetModal();
  const favoritesMusic: Favorites = useFavoritesMusic((state) =>
    JSON.parse(state.favorites)
  );
  const isMusicFavorited: boolean =
    favoritesMusic.assets.filter((state) => state.uri == props.music.uri)
      .length > 0;
  const refreshFavoritesMusic: RefreshFavoritesMusic = useFavoritesMusic(
    (state) => state.refresh
  );
  const musicInformationDrawerRef: React.MutableRefObject<BottomSheetModalMethods | null> =
    React.useRef(null);
  const addToPlaylistDrawerRef: React.MutableRefObject<BottomSheetModalMethods | null> =
    React.useRef(null);

  return (
    <>
      <Drawer modalRef={props.modalRef} snapPoints={["40%"]}>
        <View style={playlistMusicOptionsStyles.wrapper}>
          <MusicOptionsList
            title="Play music"
            icon={PlaySVG}
            onPress={() =>
              playMusic({ music: props.music, currentDuration: 0 })
            }
          />
          <MusicOptionsList
            title="Add to playlist"
            icon={AlbumSVG}
            onPress={() => addToPlaylistDrawerRef.current?.present()}
          />
          {!isMusicFavorited ? (
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
            title="Remove from playlist"
            icon={TrashSVG}
            fill={destructiveColor}
            textStyle={{
              color: destructiveColor,
            }}
            onPress={() => {
              dismissAll();
              removeFromPlaylist(props.playlistItem, props.music);
              refreshPlaylist();
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
  props: PlaylistMusicOptionsListProps
): React.JSX.Element {
  return (
    <TouchableHighlight
      style={playlistMusicOptionsStyles.listWrapper}
      onPress={props.onPress}
      underlayColor={underlayColor}
    >
      <>
        <props.icon width={22} height={22} fill={props.fill} />
        <Text style={[playlistMusicOptionsStyles.listTitle, props.textStyle]}>
          {props.title}
        </Text>
      </>
    </TouchableHighlight>
  );
}

export default React.memo(PlaylistMusic);

const playlistMusicOptionsStyles = StyleSheet.create({
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

const playlistMusicStyles = StyleSheet.create({
  container: {
    borderRadius,
    paddingHorizontal: 6,
    paddingVertical: 10,
    flex: 1,
  },
  wrapper: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    justifyContent: "space-between",
  },
  icon: {
    borderRadius,
    width: 28,
    height: 28,
  },
  metadata: {
    gap: 1,
    width: "80%",
  },
  title: {
    fontFamily: "medium",
  },
  description: {
    fontSize: 10.5,
    opacity: 0.8,
  },
});
