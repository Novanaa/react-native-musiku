import React from "react";
import Container from "@/components/atomics/container";
import FavoritePlaylist from "@/components/atomics/favorite-playlist";
import { StyleSheet } from "react-native";
import { AddPlaylist } from "@/components/atomics/add-playlist";

export default function Playlist(): React.JSX.Element {
  return (
    <Container style={styles.container}>
      <FavoritePlaylist />
      <AddPlaylist />
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 5,
  },
});
