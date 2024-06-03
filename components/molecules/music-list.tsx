import React from "react";
import { default as MusicComponent } from "../atomics/music";
import { FlatList, StyleSheet } from "react-native";
import { EmptyMusic, MusicNotDetected } from "./not-found";
import { Music, useMusicStore } from "@/stores/music";

export default function MusicList(): React.JSX.Element {
  const music: Music = useMusicStore((state) => state.music) as Music;

  // Validate if user songs is not detected
  if (music == null) return <MusicNotDetected />;

  // Validate if user songs is empty
  if (!music.totalCount) return <EmptyMusic />;

  return (
    <FlatList
      data={music.assets}
      style={styles.container}
      renderItem={(data) => <MusicComponent musicItem={data.item} />}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
    marginBottom: 8,
    height: 100,
  },
});
