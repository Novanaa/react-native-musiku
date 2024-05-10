import React from "react";
import Music from "../atomics/music";
import { ScrollView, StyleSheet } from "react-native";
import { EmptyMusic, MusicNotDetected, MusicSearchNotFound } from "./not-found";
import { MusicContext, MusicContextData } from "@/providers/music-provider";
import * as MediaLibrary from "expo-media-library";
import { useDebounce } from "use-debounce";

interface SearchListProps {
  keyword: string;
}

export default function SearchList(props: SearchListProps): React.JSX.Element {
  const musicContext: MusicContextData = React.useContext(MusicContext);
  const [keyword] = useDebounce<string>(props.keyword, 300);

  // Validate if user songs is not detected
  if (musicContext == null) return <MusicNotDetected />;

  // Validate if user songs is empty
  if (!musicContext.totalCount) return <EmptyMusic />;

  const filteredMusic: Array<MediaLibrary.Asset> = musicContext.assets.filter(
    (item) => item.filename.toLowerCase().includes(keyword.toLowerCase())
  );

  if (!filteredMusic.length) return <MusicSearchNotFound />;

  return (
    <ScrollView style={styles.container}>
      {filteredMusic.map((item) => (
        <Music
          key={item.id}
          description="Unknown Artist - Unknown Album"
          title={item.filename}
        />
      ))}
    </ScrollView>
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
