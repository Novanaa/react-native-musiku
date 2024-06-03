import React from "react";
import { default as MusicComponent } from "../atomics/music";
import { FlatList, StyleSheet } from "react-native";
import { EmptyMusic, MusicSearchNotFound } from "./not-found";
import * as MediaLibrary from "expo-media-library";
import { useDebounce } from "use-debounce";
import { SearchWelcomeScreen } from "./welcome";
import { Music, useMusicStore } from "@/stores/music";

interface SearchListProps {
  keyword: string;
}

export default function SearchList(props: SearchListProps): React.JSX.Element {
  const music: Music = useMusicStore((state) => state.music) as Music;
  const [keyword] = useDebounce<string>(props.keyword, 300);

  // Validate if user songs is not detected
  if (music == null) return <MusicSearchNotFound />;

  // Validate if user songs is empty
  if (!music.totalCount) return <EmptyMusic />;

  const filterMusic = React.useCallback(
    () =>
      music.assets.filter((item) =>
        item.filename.toLowerCase().includes(keyword.toLowerCase())
      ),
    [keyword]
  );

  const filteredMusic: Array<MediaLibrary.Asset> = keyword ? filterMusic() : [];

  if (!keyword) return <SearchWelcomeScreen />;

  if (!filteredMusic.length) return <MusicSearchNotFound />;

  return (
    <FlatList
      data={filteredMusic}
      style={styles.container}
      renderItem={(data) => <MusicComponent musicItem={data.item} />}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
    marginBottom: 8,
    flex: 1,
    borderWidth: 1,
  },
});
