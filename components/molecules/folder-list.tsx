import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import Folder from "../atomics/folder";
import { EmptyMusic, MusicNotDetected } from "./not-found";
import { FolderContext, FolderContextData } from "@/providers/folder-provider";

export default function FolderList(): React.JSX.Element {
  const folderContext: FolderContextData = React.useContext(FolderContext);

  // Validate if the user music is not detected
  if (folderContext == null) return <MusicNotDetected />;

  // Validate if the user music is empty
  if (!folderContext.length) return <EmptyMusic />;

  return (
    <ScrollView style={styles.container}>
      {folderContext.map((item) => (
        <View style={styles.wrapper} key={item.path}>
          <Folder title={item.folderName} description={item.path} />
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
  },
  wrapper: { marginVertical: 2 },
});
