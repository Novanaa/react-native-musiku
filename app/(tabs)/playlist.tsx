import React from "react";
import Container from "@/components/atomics/container";
import { StyleSheet } from "react-native";
import PlaylistHeader from "@/components/molecules/playlist-header";

export default function Playlist(): React.JSX.Element {
  return (
    <Container style={styles.container}>
      <PlaylistHeader />
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 5,
  },
});
