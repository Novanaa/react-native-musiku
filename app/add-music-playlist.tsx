import { EmptyMusic, MusicNotDetected } from "@/components/molecules/not-found";
import { Music, useMusicStore } from "@/stores/music";
import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import AddMusicPlaylistItem from "@/components/atomics/add-music-playlist-item";
import { Playlist } from "@/interfaces/playlist";

interface AddMusicPlaylistSearchParams {
  item: string;
}

export default function AddMusicPlaylist(): React.JSX.Element {
  const params: AddMusicPlaylistSearchParams =
    // @ts-expect-error interface conflict
    useLocalSearchParams() as AddMusicPlaylistSearchParams;
  const playlist: Playlist = JSON.parse(params.item);
  const music: Music = useMusicStore((state) => state.music) as Music;

  // Validate if user songs is not detected
  if (music == null) return <MusicNotDetected />;

  // Validate if user songs is empty
  if (!music.totalCount) return <EmptyMusic />;

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
