import React from "react";
import Music from "../atomics/music";
import { FlatList, StyleSheet } from "react-native";
import { EmptyMusic, MusicNotDetected } from "./not-found";

export default function MusicList(): React.JSX.Element {
  // Validate if user songs is empty
  if (true) return <EmptyMusic />;

  // Validate if user songs is not detected
  if (true) return <MusicNotDetected />;

  return (
    <FlatList
      // User songs data goes here!
      data={[]}
      renderItem={() => (
        <Music
          // Just a placeholder text for user songs
          description="Unknown Artist - Unknown Album"
          title="Sufjan Stevens - The Black Hawk War, or, How to Demolish an Entire Civilization and Still Feel Good About Yourself in the Morning, or, We Apologize for the Inconvenience but You're Going to Have to Leave Now, or, 'I Have Fought the Big Knives and Will Continue to Fight Them Until They Are Off Our Lands!"
        />
      )}
      style={styles.container}
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
