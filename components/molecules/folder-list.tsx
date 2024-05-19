import React from "react";
import { StyleSheet, View, FlatList } from "react-native";
import Folder from "../atomics/folder";
import { EmptyMusic, MusicNotDetected } from "./not-found";
import { Folder as IFolder, useFolderStore } from "@/stores/folder";

export default function FolderList(): React.JSX.Element {
  const folder: IFolder = useFolderStore((state) => state.folder) as IFolder;

  // Validate if the user music is not detected
  if (folder == null) return <MusicNotDetected />;

  // Validate if the user music is empty
  if (!folder.length) return <EmptyMusic />;

  return (
    <FlatList
      style={styles.container}
      data={folder}
      renderItem={(data) => (
        <View style={styles.wrapper} key={data.item.path}>
          <Folder title={data.item.folderName} path={data.item.path} />
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
  },
  wrapper: { marginVertical: 2 },
});
