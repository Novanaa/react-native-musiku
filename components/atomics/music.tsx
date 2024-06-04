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
import parseDuration from "@/utils/parse-duration";
import MusicPlayer from "./music-player";

interface MusicProps extends TouchableHighlightProps {
  musicItem: MediaLibrary.Asset;
}

function Music(props: MusicProps): React.JSX.Element {
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
        style={styles.container}
        onPress={() => {
          playerDrawerRef.current?.present();
          playMusic({
            music: props.musicItem,
            currentDuration: 0,
          });
        }}
      >
        <View style={styles.wrapper}>
          <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
            <MusicSVG width={28} height={28} />
            <View style={styles.metadata}>
              <Text style={styles.title} numberOfLines={1}>
                {props.musicItem.filename}
              </Text>
              <Text numberOfLines={1} style={styles.description}>
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
      <MusicOptions modalRef={optionsDrawerRef} music={props.musicItem} />
      <MusicPlayer
        modalRef={playerDrawerRef}
        music={props.musicItem}
        musicOptionsRef={optionsDrawerRef}
      />
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
