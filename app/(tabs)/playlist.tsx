import React from "react";
import Container from "@/components/atomics/container";
import { FlatList, StyleSheet } from "react-native";
import PlaylistHeader from "@/components/molecules/playlist-header";
import { PlaylistScheme } from "@/interfaces/playlist";
import { usePlaylistStore } from "@/stores/playlist";
import PlaylistItem from "@/components/atomics/playlist-item";

export default function Playlist(): React.JSX.Element {
  const list: PlaylistScheme = usePlaylistStore((state) => state.playlist);

  return (
    <Container style={styles.container}>
      <PlaylistHeader />
      <FlatList
        keyExtractor={(item) => String(item.id)}
        style={styles.listContainer}
        data={list.playlist}
        renderItem={(data) => (
          <PlaylistItem
            title={data.item.title}
            description={`${data.item.totalSongs} Songs`}
          />
        )}
      />
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 5,
  },
  listContainer: {
    top: 70,
  },
});
