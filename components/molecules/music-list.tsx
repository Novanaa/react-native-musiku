import React from "react";
import Music from "../atomics/music";
import { FlatList, StyleSheet } from "react-native";
import { EmptyMusic, MusicNotDetected } from "./not-found";
import { MusicContext, MusicContextData } from "@/providers/music-provider";

export default function MusicList(): React.JSX.Element {
  const musicContext: MusicContextData = React.useContext(MusicContext);

  // Validate if user songs is not detected
  if (musicContext == null) return <MusicNotDetected />;

  // Validate if user songs is empty
  if (!musicContext.totalCount) return <EmptyMusic />;

  return (
    <FlatList
      data={musicContext.assets}
      style={styles.container}
      renderItem={(data) => (
        <Music
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
