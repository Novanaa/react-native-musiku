import { PlaylistScheme } from "@/interfaces/playlist";
import { usePlaylistStore } from "@/stores/playlist";
import React from "react";
import { FlatList, StyleSheet } from "react-native";
import PlaylistItem from "../atomics/playlist-item";
import { EmptyPlaylist } from "./not-found";

export default function RenderPlaylist(): React.JSX.Element {
  const list: PlaylistScheme = usePlaylistStore((state) =>
    JSON.parse(state.playlist)
  );

  if (!list.totalPlaylist) return <EmptyPlaylist />;

  return (
    <FlatList
      keyExtractor={(item) => String(item.id)}
      style={styles.container}
      data={list.playlist}
      renderItem={(data) => (
        <PlaylistItem
          title={data.item.title}
          description={`${data.item.totalSongs} Songs`}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    top: 70,
  },
});
