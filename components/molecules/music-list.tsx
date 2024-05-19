import React from "react";
import { default as MusicComponent } from "../atomics/music";
import { FlatList, StyleSheet } from "react-native";
import { EmptyMusic, MusicNotDetected } from "./not-found";
import { Music, useMusicStore } from "@/stores/music";
import SortByRepository from "@/repository/sort-by.repository";
import { SortByState, useSortByStore } from "@/stores/sort-by";

export default function MusicList(): React.JSX.Element {
  const music: Music = useMusicStore((state) => state.music) as Music;

  // Validate if user songs is not detected
  if (music == null) return <MusicNotDetected />;

  // Validate if user songs is empty
  if (!music.totalCount) return <EmptyMusic />;

  // Get boolean state if the sort by state is updated
  const isSortByStateStored: SortByState = useSortByStore((state) => state);

  React.useEffect(() => {
    // Get lastest sort by state
    SortByRepository.getSortByStateAsync().then((state) => {
      if (state == "ascending")
        music.assets.sort((a, b) => a.filename.localeCompare(b.filename));

      if (state == "descending")
        music.assets.sort((a, b) => b.filename.localeCompare(a.filename));
    });

    // Rendered if the sort by state is updated
  }, [isSortByStateStored]);

  return (
    <FlatList
      data={music.assets}
      style={styles.container}
      renderItem={(data) => (
        <MusicComponent
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
    marginTop: 8,
    marginBottom: 8,
    height: 100,
  },
});
