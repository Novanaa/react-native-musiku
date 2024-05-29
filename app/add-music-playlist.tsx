import { EmptyMusic, MusicNotDetected } from "@/components/molecules/not-found";
import { Music, useMusicStore } from "@/stores/music";
import React from "react";
import {
  FlatList,
  StyleSheet,
  BackHandler,
  NativeEventSubscription,
} from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";
import AddMusicPlaylistItem from "@/components/atomics/add-music-playlist-item";
import { Playlist } from "@/interfaces/playlist";
import { RefreshPlaylist, usePlaylistStore } from "@/stores/playlist";
import { NavigationProp } from "@react-navigation/native";

interface AddMusicPlaylistSearchParams {
  item: string;
}

export default function AddMusicPlaylist(): React.JSX.Element {
  const navigation: NavigationProp<ReactNavigation.RootParamList> =
    useNavigation();
  const refreshPlaylist: RefreshPlaylist = usePlaylistStore(
    (state) => state.refresh
  );
  const params: AddMusicPlaylistSearchParams =
    // @ts-expect-error interface conflict
    useLocalSearchParams() as AddMusicPlaylistSearchParams;
  const playlist: Playlist = JSON.parse(params.item);
  const music: Music = useMusicStore((state) => state.music) as Music;

  // Validate if user songs is not detected
  if (music == null) return <MusicNotDetected />;

  // Validate if user songs is empty
  if (!music.totalCount) return <EmptyMusic />;

  React.useEffect(() => {
    const backHandler: NativeEventSubscription = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        refreshPlaylist();
        navigation.goBack();
        return true;
      }
    );

    return () => backHandler.remove();
  }, []);

  return (
    <FlatList
      data={music.assets}
      style={styles.container}
      renderItem={(data) => (
        <AddMusicPlaylistItem
          playlist={playlist}
          description="Unknown Artist - Unknown Album"
          title={data.item.filename}
          musicItem={data.item}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  wrapper: {
    paddingHorizontal: 5,
  },
});
