import React from "react";
import Drawer, { DrawerProps } from "./drawer";
import Text from "./text";
import {
  StyleSheet,
  TextStyle,
  TouchableHighlight,
  TouchableHighlightProps,
  View,
} from "react-native";
import { destructiveColor, underlayColor } from "@/constants/colors";
import { SvgProps } from "react-native-svg";
import { borderRadius } from "@/constants/styles";
import TrashSVG from "@/assets/icons/trash.svg";
import MusicSVG from "@/assets/icons/music.svg";
import AlbumSVG from "@/assets/icons/album.svg";
import { useRouter } from "expo-router";
import { ExpoRouter } from "expo-router/types/expo-router";
import { Playlist } from "@/interfaces/playlist";
import {
  PlaylistTitleSetter,
  RefreshPlaylist,
  usePlaylistStore,
} from "@/stores/playlist";
import deletePlaylist from "@/utils/delete-playlist";

interface PlaylistOptionsProps extends DrawerProps {
  item: Playlist;
}

interface PlaylistOptionsItemProps extends TouchableHighlightProps {
  icon: React.FC<SvgProps>;
  title: string;
  textStyle?: TextStyle;
}

export default function PlaylistOptions(
  props: PlaylistOptionsProps
): React.JSX.Element {
  const refreshPlaylist: RefreshPlaylist = usePlaylistStore(
    (state) => state.refresh
  );
  const setPlaylistTitle: PlaylistTitleSetter = usePlaylistStore(
    (state) => state.setPlaylistTitle
  );
  const router: ExpoRouter.Router = useRouter();

  return (
    <Drawer modalRef={props.modalRef} snapPoints={["27%"]}>
      <View style={styles.wrapper}>
        <PlaylistOptionsItem
          icon={AlbumSVG}
          title="View playlist"
          onPress={() => {
            router.push(`/playlist?item=${JSON.stringify(props.item)}`);
            setPlaylistTitle(props.item.title);
            props.modalRef.current?.close();
          }}
        />
        <PlaylistOptionsItem
          icon={MusicSVG}
          title="Add music"
          onPress={() => {
            router.push(
              `/add-music-playlist?item=${JSON.stringify(props.item)}`
            );
            props.modalRef.current?.close();
          }}
        />
        <PlaylistOptionsItem
          icon={TrashSVG}
          textStyle={{
            color: destructiveColor,
          }}
          title="Delete playlist"
          onPress={() => {
            deletePlaylist(props.item);
            refreshPlaylist();
          }}
        />
      </View>
    </Drawer>
  );
}

export function PlaylistOptionsItem(
  props: PlaylistOptionsItemProps
): React.JSX.Element {
  return (
    <TouchableHighlight
      {...props}
      onPress={props.onPress}
      underlayColor={underlayColor}
      style={[styles.listWrapper, props.style]}
    >
      <>
        <props.icon width={22} height={22} />
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
