import PlaylistMusic from "@/components/atomics/playlist-music";
import { EmptyPlaylistMusic } from "@/components/molecules/not-found";
import { Playlist as IPlaylist, PlaylistScheme } from "@/interfaces/playlist";
import { usePlaylistStore } from "@/stores/playlist";
import getPlaylistIndex from "@/utils/get-playlist-index";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { FlatList, StyleSheet, View } from "react-native";

interface PlaylistSearchParams {
  item: string;
}

export default function Playlist(): React.JSX.Element {
  const list: PlaylistScheme = usePlaylistStore((state) =>
    JSON.parse(state.playlist)
  );
  const params: PlaylistSearchParams =
    // @ts-expect-error interface conflict
    useLocalSearchParams() as PlaylistSearchParams;
  const playlistItem: IPlaylist = JSON.parse(params.item);
  const playlistIndex: number = React.useMemo(
    () =>
      getPlaylistIndex({
        list,
        playlistId: playlistItem.id,
      }),
    [list.playlist]
  );
  const playlist: IPlaylist = list.playlist[playlistIndex];

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
