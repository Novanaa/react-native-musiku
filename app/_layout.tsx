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
import getMusic from "@/utils/get-music";
import { Music, MusicSetter, useMusicStore } from "@/stores/music";
import { Folder, FolderSetter, useFolderStore } from "@/stores/folder";
import getFolder from "@/utils/get-folder";
import SortByRepository from "@/repository/sort-by.repository";
import * as MediaLibrary from "expo-media-library";
import { Welcome } from "@/components/molecules/welcome";
import * as SecureStore from "expo-secure-store";
import PlaylistRepository from "@/repository/playlist.repository";
import { RefreshPlaylist, usePlaylistStore } from "@/stores/playlist";
import FavoriteRepository from "@/repository/favorite.repository";
import { RefreshFavoritesMusic, useFavoritesMusic } from "@/stores/favorites";
import uuid from "react-native-uuid";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [permission] = MediaLibrary.usePermissions();
  const [loaded, error] = useFonts(fonts);
  const music: Music | null = useMusicStore((state) => state.music);
  const refreshFavoritesMusic: RefreshFavoritesMusic = useFavoritesMusic(
    (state) => state.refresh
  );
  const refreshPlaylist: RefreshPlaylist = usePlaylistStore(
    (state) => state.refresh
  );
  const musicStoreDispatch: MusicSetter = useMusicStore(
    (state) => state.setMusic
  );
  const folderDispatch: FolderSetter = useFolderStore(
    (state) => state.setFolder
  );

  React.useEffect(() => {
    if (!SecureStore.getItem(FavoriteRepository.favoriteKey)) {
      FavoriteRepository.setFavorites({
        assets: [],
        total: 0,
      });

      refreshFavoritesMusic();
    }

    if (!SecureStore.getItem(PlaylistRepository.playlistKey)) {
      PlaylistRepository.setPlaylist({
        playlist: [
          {
            id: String(uuid.v4()),
            songs: [],
            title: "My Playlist",
            totalSongs: 0,
            createdAt: new Date().getTime(),
          },
        ],
        totalPlaylist: 1,
      });

      refreshPlaylist();
    }

    if (!SortByRepository.getSortByState())
      SortByRepository.setSortByState("recently_added");

    getMusic().then((state) => {
      const folder: Folder = getFolder(state);

      folderDispatch(folder);
      musicStoreDispatch(state);
    });
  }, []);

  React.useEffect(() => {
    if (error) throw error;

    if (loaded) SplashScreen.hideAsync();
    if (permission?.granted) {
      if (loaded && music !== null) SplashScreen.hideAsync();
    }
  }, [loaded, music, permission?.granted]);

  if (!loaded && !error && !music) return null;

  return (
    <GestureHandlerRootView
      style={{ flex: 1, backgroundColor: colors.dark.background }}
    >
      <BottomSheetModalProvider>
        <Welcome>
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
                animation: "ios",
              }}
            />
            <Stack.Screen
              name="favorite"
              options={{
                title: "Favorites",
                headerTintColor: textColor,
                headerStyle: {
                  backgroundColor: headerBackgoundColor,
                },
                animation: "ios",
              }}
            />
            <Stack.Screen
              name="playlist"
              options={{
                title: "Playlist",
                headerTintColor: textColor,
                headerStyle: {
                  backgroundColor: headerBackgoundColor,
                },
                animation: "ios",
              }}
            />
          </Stack>
        </Welcome>
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
