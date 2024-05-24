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

interface PlaylistHeaderOptionsItemProps extends TouchableHighlightProps {
  icon: React.FC<SvgProps>;
  title: string;
  textStyle?: TextStyle;
}

export default function PlaylistHeaderOptions(
  props: DrawerProps
): React.JSX.Element {
  return (
    <Drawer modalRef={props.modalRef} snapPoints={["27%"]}>
      <View style={styles.wrapper}>
        <PlaylistHeaderOptionsItem
          onPress={() => console.log("test")}
          icon={AlbumSVG}
          title="Add Playlist"
        />
        <PlaylistHeaderOptionsItem
          onPress={() => console.log("test")}
          icon={HeartSVG}
          title="Favorites Music"
        />
        <PlaylistHeaderOptionsItem
          onPress={() => console.log("test")}
          icon={TrashSVG}
          title="Removes Playlist"
          textStyle={{
            color: destructiveColor,
          }}
        />
      </View>
    </Drawer>
  );
}

export function PlaylistHeaderOptionsItem(
  props: PlaylistHeaderOptionsItemProps
): React.JSX.Element {
  return (
    <TouchableHighlight
      onPress={props.onPress}
      underlayColor={underlayColor}
      style={styles.listWrapper}
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
