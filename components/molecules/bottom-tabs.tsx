import { Tabs } from "expo-router";
import React from "react";
import TabIcon from "../atomics/tab-icon";
import * as colors from "@/constants/colors";
import { StyleSheet } from "react-native";
import { IconButton } from "../atomics/button";
import DirectoryStatistic from "./directory-statistics";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import HomeSVG from "@/assets/icons/home.svg";
import PlaylistSVG from "@/assets/icons/media-library.svg";
import SearchSVG from "@/assets/icons/magnifying-glass.svg";
import FolderSVG from "@/assets/icons/folder.svg";
import MusicOptionsSVG from "@/assets/icons/music-options.svg";
import SolidHomeSVG from "@/assets/icons/solid-home.svg";
import SolidFolderSVG from "@/assets/icons/solid-folder.svg";
import SolidPlaylistSVG from "@/assets/icons/solid-media-library.svg";
import SolidSearchSVG from "@/assets/icons/solid-search.svg";

export default function BottomTabs(): React.JSX.Element {
  const directoryStatisticDrawerRef: React.MutableRefObject<null | BottomSheetModalMethods> =
    React.useRef(null);

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarStyle: styles.tabs,
          tabBarShowLabel: false,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            headerShown: false,
            title: "Home",
            tabBarIcon: ({ focused }) => (
              <TabIcon
                focused={focused}
                Icon={HomeSVG}
                FocusedIcon={SolidHomeSVG}
              />
            ),
            tabBarActiveTintColor: colors.textColor,
          }}
        />
        <Tabs.Screen
          name="search"
          options={{
            headerShown: false,
            title: "Search",
            tabBarIcon: ({ focused }) => (
              <TabIcon
                focused={focused}
                Icon={SearchSVG}
                FocusedIcon={SolidSearchSVG}
              />
            ),
            tabBarActiveTintColor: colors.textColor,
          }}
        />
        <Tabs.Screen
          name="playlist"
          options={{
            headerShown: false,
            title: "Playlist",
            tabBarIcon: ({ focused }) => (
              <TabIcon
                focused={focused}
                Icon={PlaylistSVG}
                FocusedIcon={SolidPlaylistSVG}
              />
            ),
            tabBarActiveTintColor: colors.textColor,
          }}
        />
        <Tabs.Screen
          name="folders"
          options={{
            headerStyle: { backgroundColor: colors.headerBackgoundColor },
            headerTitleStyle: {
              color: colors.textColor,
            },
            title: "Directories",
            tabBarIcon: ({ focused }) => (
              <TabIcon
                focused={focused}
                Icon={FolderSVG}
                FocusedIcon={SolidFolderSVG}
              />
            ),
            headerRight: () => (
              <IconButton
                icon={<MusicOptionsSVG />}
                style={{ paddingRight: 13 }}
                onPress={() => directoryStatisticDrawerRef.current?.present()}
              />
            ),
            tabBarActiveTintColor: colors.textColor,
          }}
        />
      </Tabs>
      <DirectoryStatistic modalRef={directoryStatisticDrawerRef} />
    </>
  );
}

const styles = StyleSheet.create({
  tabs: {
    backgroundColor: colors.backgroundColor,
    color: colors.textColor,
  },
});
