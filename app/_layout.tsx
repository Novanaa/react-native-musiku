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
import * as MediaLibrary from "expo-media-library";
import { Welcome } from "@/components/molecules/welcome";
import { usePlaylistStore } from "@/stores/playlist";
import { RootSiblingParent } from "react-native-root-siblings";
import { SetCurrentMusicPlayed, usePlayerStore } from "@/stores/player";
import TrackPlayer, {
  Event,
  useTrackPlayerEvents,
} from "react-native-track-player";
import { registerRootComponent } from "expo";
import appInit from "@/utils/app-init";

registerRootComponent(RootLayout);
TrackPlayer.registerPlaybackService(() => require("../services/playback"));

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [permission] = MediaLibrary.usePermissions();
  const [loaded, error] = useFonts(fonts);
  const music: Music | null = useMusicStore((state) => state.music);
  const playlistStackScreenTitle: string = usePlaylistStore(
    (state) => state.playlistTitle
  );
  const setCurrentMusicPlayed: SetCurrentMusicPlayed = usePlayerStore(
    (state) => state.setCurrentMusicPlayed
  );
  const musicStoreDispatch: MusicSetter = useMusicStore(
    (state) => state.setMusic
  );
  const folderDispatch: FolderSetter = useFolderStore(
    (state) => state.setFolder
  );

  useTrackPlayerEvents([Event.PlaybackActiveTrackChanged], (event) => {
    if (music && event.type == Event.PlaybackActiveTrackChanged) {
      const musicIndex: number = music.assets.findIndex(
        (state) => state.uri === event.track?.url
      );

      setCurrentMusicPlayed({
        music: music.assets[musicIndex],
        currentDuration: 0,
      });
    }
  });

  React.useEffect(() => {
    appInit();

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
