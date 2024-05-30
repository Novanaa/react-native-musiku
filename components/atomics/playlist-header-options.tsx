import React from "react";
import Drawer, { DrawerProps } from "./drawer";
import {
  StyleSheet,
  TouchableHighlightProps,
  TextStyle,
  TouchableHighlight,
  View,
} from "react-native";
import { SvgProps } from "react-native-svg";
import Text from "./text";
import { destructiveColor, underlayColor } from "@/constants/colors";
import { borderRadius } from "@/constants/styles";
import TrashSVG from "@/assets/icons/trash.svg";
import AlbumSVG from "@/assets/icons/album.svg";
import HeartSVG from "@/assets/icons/heart.svg";
import { useRouter } from "expo-router";
import { ExpoRouter } from "expo-router/types/expo-router";
import { RemovesAllPlaylist } from "./playlist-header-options-actions";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { usePlaylistStore } from "@/stores/playlist";
import { PlaylistScheme } from "@/interfaces/playlist";
import AddPlaylist from "./add-playlist";

interface PlaylistHeaderOptionsItemProps extends TouchableHighlightProps {
  icon: React.FC<SvgProps>;
  title: string;
  textStyle?: TextStyle;
}

export default function PlaylistHeaderOptions(
  props: DrawerProps
): React.JSX.Element {
  const list: PlaylistScheme = usePlaylistStore((state) =>
    JSON.parse(state.playlist)
  );
  const removesPlaylistDrawerRef: React.MutableRefObject<BottomSheetModalMethods | null> =
    React.useRef<BottomSheetModalMethods | null>(null);
  const addPlaylistDrawerRef: React.MutableRefObject<BottomSheetModalMethods | null> =
    React.useRef<BottomSheetModalMethods | null>(null);
  const router: ExpoRouter.Router = useRouter();
  const removesPlaylistButtonDisabled: boolean = !list.totalPlaylist;

  return (
    <>
      <Drawer modalRef={props.modalRef} snapPoints={["27%"]}>
        <View style={styles.wrapper}>
          <PlaylistHeaderOptionsItem
            onPress={() => addPlaylistDrawerRef.current?.present()}
            icon={AlbumSVG}
            title="Add Playlist"
          />
          <PlaylistHeaderOptionsItem
            onPress={() => {
              router.push("/favorite");
              props.modalRef.current?.close();
            }}
            icon={HeartSVG}
            title="Favorites Music"
          />
          <PlaylistHeaderOptionsItem
            style={{
              opacity: removesPlaylistButtonDisabled ? 0.55 : 1,
            }}
            disabled={removesPlaylistButtonDisabled}
            onPress={() => removesPlaylistDrawerRef.current?.present()}
            icon={TrashSVG}
            title="Removes Playlist"
            textStyle={{
              color: destructiveColor,
            }}
          />
        </View>
      </Drawer>
      <RemovesAllPlaylist modalRef={removesPlaylistDrawerRef} />
      <AddPlaylist modalRef={addPlaylistDrawerRef} />
    </>
  );
}

export function PlaylistHeaderOptionsItem(
  props: PlaylistHeaderOptionsItemProps
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
