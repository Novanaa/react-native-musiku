import React from "react";
import Drawer, { DrawerProps, DrawerWrapper } from "./drawer";
import * as MediaLibrary from "expo-media-library";
import colors, { backgroundColor, borderColor } from "@/constants/colors";
import { Image, StyleSheet, View } from "react-native";
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

interface MusicPlayerProps extends DrawerProps {
  music: MediaLibrary.Asset;
  musicOptionsRef: React.MutableRefObject<null | BottomSheetModalMethods>;
}

export default function MusicPlayer(
  props: MusicPlayerProps
): React.JSX.Element {
  const addToPlaylistDrawerRef: React.MutableRefObject<BottomSheetModalMethods | null> =
    React.useRef<BottomSheetModalMethods | null>(null);
  const { dismissAll }: BottomSheetModalContextType = useBottomSheetModal();

  const musicDuration: string = React.useMemo(
    () => parseDuration(String(props.music.duration)),
    [props.music]
  );

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
                {props.music.filename}
              </Text>
              <Text numberOfLines={1} style={styles.musicMetadataDescription}>
                {`(${musicDuration}) - Unknown Artist - Unknown Album`}
              </Text>
            </View>
            <View>
              <OutlineFavoritesSVG width={25} height={25} />
            </View>
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
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 20,
            }}
          >
            <IconButton icon={<ArrowPathSVG width={22.5} height={22.5} />} />
            <View style={styles.musicControllerWrapper}>
              <IconButton icon={<SkipBackSVG width={40} height={40} />} />
              <IconButton icon={<PlaySVG width={40} height={40} />} />
              <IconButton icon={<SkipForwardSVG width={40} height={40} />} />
            </View>
            <IconButton
              icon={<ListOptionsSVG width={22.5} height={22.5} />}
              onPress={() => addToPlaylistDrawerRef.current?.present()}
            />
          </View>
        </DrawerWrapper>
      </Drawer>
      <MusicOptionsAddToPlaylist
        stackBehavior="push"
        modalRef={addToPlaylistDrawerRef}
        music={props.music}
      />
    </>
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
