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
import { MusicOptionsInformation } from "./music-options-actions";
import * as MediaLibrary from "expo-media-library";
import { SvgProps } from "react-native-svg";
import PlaySVG from "@/assets/icons/play.svg";
import HeartSVG from "@/assets/icons/heart.svg";
import InfoSVG from "@/assets/icons/info.svg";
import TrashSVG from "@/assets/icons/trash.svg";

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
  const musicInformationDrawerRef: React.MutableRefObject<BottomSheetModalMethods | null> =
    React.useRef(null);

  return (
    <>
      <Drawer modalRef={props.modalRef} snapPoints={["33%"]}>
        <View style={styles.wrapper}>
          <MusicOptionsList
            title="Play music"
            icon={PlaySVG}
            onPress={() => console.log("action")}
          />
          <MusicOptionsList
            title="Add to playlist"
            icon={HeartSVG}
            onPress={() => console.log("action")}
          />
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
            onPress={() => console.log("action")}
          />
        </View>
      </Drawer>
      <MusicOptionsInformation
        modalRef={musicInformationDrawerRef}
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
