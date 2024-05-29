import {
  StyleSheet,
  View,
  TouchableOpacity,
  TouchableHighlightProps,
} from "react-native";
import React from "react";
import Text from "./text";
import { borderRadius } from "@/constants/styles";
import * as MediaLibrary from "expo-media-library";
import MusicSVG from "@/assets/icons/music.svg";
import { Playlist } from "@/interfaces/playlist";
import BoxSVG from "@/assets/icons/square.svg";
import CheckboxSVG from "@/assets/icons/check-square.svg";
import addMusicPlaylist from "@/utils/add-music-playlist";
import { IconButton } from "./button";

interface MusicProps extends TouchableHighlightProps {
  title: string;
  description: string;
  musicItem: MediaLibrary.Asset;
  playlist: Playlist;
}

function AddMusicPlaylistItem(props: MusicProps): React.JSX.Element {
  const [isChecked, setIsChecked] = React.useState<boolean>(false);
  const isMusicIsAlreadyAdded: boolean =
    React.useMemo(
      () =>
        props.playlist.songs.filter((state) => state.uri == props.musicItem.uri)
          .length > 0,
      [props.playlist.songs]
    ) || isChecked;

  return (
    <>
      <TouchableOpacity
        disabled={isMusicIsAlreadyAdded}
        activeOpacity={0.6}
        style={[
          styles.container,
          {
            opacity: isMusicIsAlreadyAdded ? 0.5 : 1,
          },
        ]}
        onPress={() => {
          addMusicPlaylist(props.playlist, props.musicItem);
          setIsChecked(true);
        }}
      >
        <View style={styles.wrapper}>
          <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
            <MusicSVG width={28} height={28} />
            <View style={styles.metadata}>
              <Text style={styles.title} numberOfLines={1}>
                {props.title}
              </Text>
              <Text numberOfLines={1} style={styles.description}>
                {props.description}
              </Text>
            </View>
          </View>
          <IconButton
            icon={
              isMusicIsAlreadyAdded ? (
                <CheckboxSVG width={20} height={20} />
              ) : (
                <BoxSVG width={20} height={20} />
              )
            }
            onPress={() => {
              addMusicPlaylist(props.playlist, props.musicItem);
              setIsChecked(true);
            }}
          />
        </View>
      </TouchableOpacity>
    </>
  );
}

export default React.memo(AddMusicPlaylistItem);

const styles = StyleSheet.create({
  container: {
    borderRadius,
    paddingHorizontal: 15,
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
