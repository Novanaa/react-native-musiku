import "react-native-gesture-handler";
import { StyleSheet } from "react-native";
import React from "react";
import fonts from "@/constants/fonts";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import colors, {
  textColor,
  backgroundColor,
  headerBackgoundColor,
} from "@/constants/colors";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { UserPermissionProvider } from "@/providers/user-permission";
import getMusic from "@/utils/get-music";
import { Music, MusicSetter, useMusicStore } from "@/stores/music";
import { Folder, FolderSetter, useFolderStore } from "@/stores/folder";
import getFolder from "@/utils/get-folder";
import SortByRepository from "@/repository/sort-by.repository";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts(fonts);
  const music: Music | null = useMusicStore((state) => state.music);
  const musicStoreDispatch: MusicSetter = useMusicStore(
    (state) => state.setMusic
  );
  const folderDispatch: FolderSetter = useFolderStore(
    (state) => state.setFolder
  );

  React.useEffect(() => {
    if (!SortByRepository.getSortByState())
      SortByRepository.setSortByState("ascending");

    getMusic().then((state) => {
      const folder: Folder = getFolder(state);

      folderDispatch(folder);
      musicStoreDispatch(state);
    });
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
          <StatusBar style="dark" />
          <Stack screenOptions={{ contentStyle: styles.container }}>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen
              name="folder"
              options={{
                title: "Directory",
                headerTintColor: textColor,
                headerStyle: {
                  backgroundColor: headerBackgoundColor,
                },
              }}
            />
          </Stack>
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
