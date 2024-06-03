import {
  StyleSheet,
  View,
  TouchableOpacity,
  TouchableHighlightProps,
} from "react-native";
import React from "react";
import Text from "./text";
import { borderRadius } from "@/constants/styles";
import MusicOptions from "./music-options";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import * as MediaLibrary from "expo-media-library";
import MusicSVG from "@/assets/icons/music.svg";
import MusicOptionsSVG from "@/assets/icons/music-options.svg";
import playMusic from "@/utils/play-music";

interface MusicProps extends TouchableHighlightProps {
  title: string;
  description: string;
  musicItem: MediaLibrary.Asset;
}

function Music(props: MusicProps): React.JSX.Element {
  const drawerRef: React.MutableRefObject<null | BottomSheetModalMethods> =
    React.useRef(null);

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.6}
        style={styles.container}
        onPress={() => playMusic(props.musicItem)}
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
          <TouchableOpacity
            onPress={() => drawerRef.current?.present()}
            style={{ width: 30, height: 30 }}
          >
            <MusicOptionsSVG />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
      <MusicOptions modalRef={drawerRef} music={props.musicItem} />
    </>
  );
}

export default React.memo(Music);

const styles = StyleSheet.create({
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
