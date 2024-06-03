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
import PlaylistRepository from "@/repository/playlist.repository";
import { RefreshPlaylist, usePlaylistStore } from "@/stores/playlist";
import FavoriteRepository from "@/repository/favorite.repository";
import { RefreshFavoritesMusic, useFavoritesMusic } from "@/stores/favorites";
import uuid from "react-native-uuid";
import { RootSiblingParent } from "react-native-root-siblings";
import storage from "@/libs/storage";
import { RefreshSortByState, useSortByStore } from "@/stores/sort-by";
import { Audio, InterruptionModeAndroid, InterruptionModeIOS } from "expo-av";
import PlayerRepository from "@/repository/player.repository";
import { RefreshCurrentMusicPlayed, usePlayerStore } from "@/stores/player";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [permission] = MediaLibrary.usePermissions();
  const [loaded, error] = useFonts(fonts);
  const music: Music | null = useMusicStore((state) => state.music);
  const playlistStackScreenTitle: string = usePlaylistStore(
    (state) => state.playlistTitle
  );
  const refreshCurrentMusicPlayed: RefreshCurrentMusicPlayed = usePlayerStore(
    (state) => state.refreshCurrentMusicPlayed
  );
  const refreshSortByState: RefreshSortByState = useSortByStore(
    (state) => state.refresh
  );
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
    if (!PlayerRepository.getCurrentMusicPlayed()) {
      PlayerRepository.setCurrentMusicPlayed(null);

      refreshCurrentMusicPlayed();
    }

    if (!storage.getString(FavoriteRepository.favoriteKey)) {
      FavoriteRepository.setFavorites({
        assets: [],
        total: 0,
      });

      refreshFavoritesMusic();
    }

    if (!storage.getString(PlaylistRepository.playlistKey)) {
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

    if (!storage.getString(SortByRepository.sortByKey)) {
      SortByRepository.setSortByState("recently_added");
      refreshSortByState();
    }

    getMusic().then((state) => {
      const folder: Folder = getFolder(state);

      folderDispatch(folder);
      musicStoreDispatch(state);
    });

    Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      staysActiveInBackground: true,
      interruptionModeIOS: InterruptionModeIOS.DoNotMix,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: InterruptionModeAndroid.DoNotMix,
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
          <RootSiblingParent>
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
                  title: playlistStackScreenTitle,
                  headerTintColor: textColor,
                  headerStyle: {
                    backgroundColor: headerBackgoundColor,
                  },
                  animation: "ios",
                }}
              />
              <Stack.Screen
                name="add-music-playlist"
                options={{
                  title: "Add Music",
                  headerTintColor: textColor,
                  headerStyle: {
                    backgroundColor: headerBackgoundColor,
                  },
                  animation: "ios",
                }}
              />
            </Stack>
          </RootSiblingParent>
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
