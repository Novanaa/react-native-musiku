import { Playlist, PlaylistScheme } from "@/interfaces/playlist";
import { usePlaylistStore } from "@/stores/playlist";
import React from "react";
import { FlatList, StyleSheet } from "react-native";
import PlaylistItem from "../atomics/playlist-item";
import { EmptyPlaylist, PlaylistSearchNotFound } from "./not-found";
import undefinedPlaylistMusicDetection from "@/utils/undefined-playlist-music-detection";

export default function RenderPlaylist(): React.JSX.Element {
  const searchPlaylistKeyword: string = usePlaylistStore(
    (state) => state.searchPlaylistKeyword
  );
  const list: PlaylistScheme = usePlaylistStore((state) =>
    JSON.parse(state.playlist)
  );

  React.useEffect(() => {
    undefinedPlaylistMusicDetection(list);
  }, [list]);

  const filteredPlaylist: Array<Playlist> = React.useMemo(
    () =>
      list.playlist.filter((item) =>
        item.title.toLowerCase().includes(searchPlaylistKeyword.toLowerCase())
      ),
    [searchPlaylistKeyword, list]
  );

  if (!list.totalPlaylist) return <EmptyPlaylist />;

  if (!filteredPlaylist.length) return <PlaylistSearchNotFound />;

  return (
    <FlatList
      keyExtractor={(item) => String(item.id)}
      style={styles.container}
      data={filteredPlaylist}
      renderItem={(data) => (
        <PlaylistItem
          item={data.item}
          title={data.item.title}
          description={`${data.item.totalSongs} Songs - ${new Date(data.item.createdAt).toLocaleDateString()}`}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    top: 55,
  },
});
