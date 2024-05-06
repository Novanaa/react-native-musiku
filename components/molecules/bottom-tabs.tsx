import { Tabs } from "expo-router";
import React from "react";
import TabIcon from "../atomics/tab-icon";
import * as colors from "@/constants/colors";
import { StyleSheet } from "react-native";
import { svgAssests } from "@/constants/assests";
import SvgUri from "react-native-svg-uri";
import { IconButton } from "../atomics/button";

export default function BottomTabs(): React.JSX.Element {
  return (
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
            <TabIcon focused={focused} icon={svgAssests.home} />
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
            <TabIcon focused={focused} icon={svgAssests.search} />
          ),
          tabBarActiveTintColor: colors.textColor,
        }}
      />
      <Tabs.Screen
        name="playlist"
        options={{
          headerStyle: { backgroundColor: colors.headerBackgoundColor },
          headerTitleStyle: {
            color: colors.textColor,
          },
          title: "Playlist",
          headerRight: () => (
            <IconButton
              icon={svgAssests.musicOptions}
              style={{ paddingRight: 13 }}
            />
          ),
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={svgAssests.music} />
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
            <TabIcon focused={focused} icon={svgAssests.folder} />
          ),
          headerRight: () => (
            <IconButton
              icon={svgAssests.musicOptions}
              style={{ paddingRight: 13 }}
            />
          ),
          tabBarActiveTintColor: colors.textColor,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabs: {
    backgroundColor: colors.backgroundColor,
    color: colors.textColor,
  },
});
