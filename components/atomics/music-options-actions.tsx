import React from "react";
import Drawer, { DrawerProps, DrawerWrapper } from "./drawer";
import * as MediaLibrary from "expo-media-library";
import Text from "./text";
import { StyleSheet, View, ViewProps } from "react-native";
import { borderColor } from "@/constants/colors";
import { borderRadius, rowsGap } from "@/constants/styles";
import parseDuration from "@/utils/parse-duration";
import MusicSVG from "@/assets/icons/music.svg";
import { SvgProps } from "react-native-svg";
import PlaySVG from "@/assets/icons/play.svg";
import RoundedArrowSVG from "@/assets/icons/rounded-arrow.svg";
import LocationSVG from "@/assets/icons/location.svg";

interface MusicOptionsInformationProps extends DrawerProps {
  music: MediaLibrary.Asset;
}

interface MusicOptionsInformationContentProps extends ViewProps {
  title: string;
  description: string;
  icon: React.ReactElement<SvgProps>;
}

export function MusicOptionsInformation(
  props: MusicOptionsInformationProps
): React.JSX.Element {
  const lastMusicModified: string = new Date(
    props.music.modificationTime
  ).toLocaleDateString();
  const parsedDuration: string = parseDuration(String(props.music.duration));

  return (
    <Drawer modalRef={props.modalRef} snapPoints={["47%"]}>
      <DrawerWrapper>
        <View style={musicOptionsInformationStyles.headerWrapper}>
          <MusicSVG width={30} height={30} />
          <Text style={musicOptionsInformationStyles.headerTitle}>
            {props.music.filename}
          </Text>
        </View>
        <View style={musicOptionsInformationStyles.contentContainer}>
          <MusicOptionsInformationContent
            title="Duration"
            description={parsedDuration}
            icon={<PlaySVG />}
          />
          <MusicOptionsInformationContent
            title="Last Modified"
            description={lastMusicModified}
            icon={<RoundedArrowSVG />}
          />
        </View>
        <View style={musicOptionsInformationStyles.contentContainer}>
          <MusicOptionsInformationContent
            title="Music Location"
            description={props.music.uri}
            icon={<LocationSVG />}
          />
        </View>
      </DrawerWrapper>
    </Drawer>
  );
}

export function MusicOptionsInformationContent(
  props: MusicOptionsInformationContentProps
): React.JSX.Element {
  return (
    <View style={musicOptionsInformationStyles.contentWrapper}>
      {props.icon}
      <View>
        <Text style={musicOptionsInformationStyles.contentMetadataTitle}>
          {props.title}
        </Text>
        <Text style={musicOptionsInformationStyles.contentMetadataDescription}>
          {props.description}
        </Text>
      </View>
    </View>
  );
}

const musicOptionsInformationStyles = StyleSheet.create({
  headerWrapper: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
    borderColor,
    borderWidth: 1,
    borderRadius,
    padding: 8,
  },
  headerTitle: {
    fontFamily: "medium",
    width: "92%",
    fontSize: 13.5,
  },
  contentContainer: {
    marginTop: 10,
    flexDirection: "row",
    gap: rowsGap,
  },
  contentWrapper: {
    borderRadius,
    borderColor,
    borderWidth: 1,
    padding: 10,
    flex: 1,
  },
  contentMetadataTitle: {
    fontSize: 14,
    fontFamily: "bold",
  },
  contentMetadataDescription: {
    opacity: 0.8,
    fontSize: 11,
  },
});
