import React from "react";
import Drawer, { DrawerProps, DrawerWrapper } from "../atomics/drawer";
import Text from "../atomics/text";
import { StyleSheet, View } from "react-native";
import SvgUri from "react-native-svg-uri";
import { svgAssests } from "@/constants/assests";
import { borderColor } from "@/constants/colors";
import { borderRadius, rowsGap } from "@/constants/styles";
import { Music, useMusicStore } from "@/stores/music";
import { Folder, useFolderStore } from "@/stores/folder";

interface DirectoryStatisticContentProps {
  icon: string;
  title: string;
  description: string;
}

export default function DirectoryStatistic(
  props: DrawerProps
): React.JSX.Element {
  const music: Music = useMusicStore((state) => state.music) as Music;
  const folder: Folder = useFolderStore((state) => state.folder) as Folder;

  return (
    <Drawer modalRef={props.modalRef} snapPoints={["30%"]}>
      <DrawerWrapper>
        <View style={styles.headerWrapper}>
          <SvgUri svgXmlData={svgAssests.chartPie} width={36} height={36} />
          <View>
            <Text style={styles.headerText}>Your Directory Info</Text>
            <Text style={styles.headerDescription}>
              Discover your music directory Statistics here.
            </Text>
          </View>
        </View>
        <View style={styles.contentContainer}>
          <DirectoryStatisticContent
            icon={svgAssests.music}
            title="Music"
            // Change it later with real user data
            description={`${music?.totalCount} Items Found`}
          />
          <DirectoryStatisticContent
            icon={svgAssests.folder}
            title="Folders"
            // Change it later with real user data
            description={`${folder?.length} Items Found`}
          />
        </View>
      </DrawerWrapper>
    </Drawer>
  );
}

export function DirectoryStatisticContent(
  props: DirectoryStatisticContentProps
): React.JSX.Element {
  return (
    <View style={styles.contentWrapper}>
      <SvgUri svgXmlData={props.icon} />
      <View>
        <Text style={styles.contentMetadataTitle}>{props.title}</Text>
        <Text style={styles.contentMetadataDescription}>
          {props.description}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerWrapper: {
    flexDirection: "row",
    gap: 7,
    alignItems: "center",
    borderColor,
    borderWidth: 1,
    borderRadius,
    padding: 8,
  },
  headerText: {
    fontSize: 16,
    fontFamily: "bold",
  },
  headerDescription: {
    opacity: 0.8,
    fontSize: 11,
  },
  contentContainer: {
    top: 10,
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
