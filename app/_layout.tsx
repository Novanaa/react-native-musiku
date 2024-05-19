import "react-native-gesture-handler";
import { StyleSheet } from "react-native";
import React from "react";
import fonts from "@/constants/fonts";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import colors, { backgroundColor } from "@/constants/colors";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { UserPermissionProvider } from "@/providers/user-permission";
import MusicProvider from "@/providers/music-provider";
import getMusic from "@/utils/get-music";
import * as MediaLibrary from "expo-media-library";
import FolderProvider from "@/providers/folder-provider";
import SortByRepository from "@/repository/sort-by.repository";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [music, setMusic] =
    React.useState<null | MediaLibrary.PagedInfo<MediaLibrary.Asset>>(null);
  const [loaded, error] = useFonts(fonts);

  React.useEffect(() => {
    // Set default sort music as ascending
    if (!SortByRepository.getSortByState())
      SortByRepository.setSortByState("ascending");

    getMusic().then((state) => setMusic(state));
  }, []);

  React.useEffect(() => {
    if (error) throw error;

    if (loaded && music !== null) SplashScreen.hideAsync();
  }, [loaded, music]);

  if (!loaded && !error && !music) return null;

  return (
    <GestureHandlerRootView
      style={{ flex: 1, backgroundColor: colors.dark.background }}
    >
      <BottomSheetModalProvider>
        <UserPermissionProvider>
          <MusicProvider music={music}>
            <FolderProvider>
              <StatusBar style="dark" />
              <Stack screenOptions={{ contentStyle: styles.container }}>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              </Stack>
            </FolderProvider>
          </MusicProvider>
        </UserPermissionProvider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor,
    flex: 1,
  },
});
