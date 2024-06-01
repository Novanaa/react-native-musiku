import PlaylistMusic from "@/components/atomics/playlist-music";
import { EmptyPlaylistMusic } from "@/components/molecules/not-found";
import { Playlist as IPlaylist } from "@/interfaces/playlist";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { FlatList, StyleSheet, View } from "react-native";

interface PlaylistSearchParams {
  item: string;
}

export default function Playlist(): React.JSX.Element {
  const params: PlaylistSearchParams =
    // @ts-expect-error interface conflict
    useLocalSearchParams() as PlaylistSearchParams;
  const playlist: IPlaylist = JSON.parse(params.item);

  if (!playlist.totalSongs) return <EmptyPlaylistMusic playlist={playlist} />;

  return (
    <FlatList
      data={playlist.songs}
      style={styles.container}
      renderItem={(data) => (
        <View style={styles.wrapper}>
          <PlaylistMusic
            playlistItem={playlist}
            description="Unknown Artist - Unknown Album"
            title={data.item.filename}
            musicItem={data.item}
          />
        </View>
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
