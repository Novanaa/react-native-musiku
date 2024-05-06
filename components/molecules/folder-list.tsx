import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import Folder from "../atomics/folder";
import { EmptyMusic } from "./not-found";

export default function FolderList(): React.JSX.Element {
  // Validate if the user music is empty
  if (true) return <EmptyMusic />;

  return (
    <FlatList
      style={styles.container}
      // Replac this with real user data
      data={[]}
      renderItem={() => (
        // Folder title and description placeholder (for now)
        <Folder title="Document" description="6 Songs - 18/1/2024" />
      )}
      ItemSeparatorComponent={() => <View style={{ height: 5 }} />}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
});
