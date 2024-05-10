import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import Folder from "../atomics/folder";
import { EmptyMusic, MusicNotDetected } from "./not-found";
import { MusicContext, MusicContextData } from "@/providers/music-provider";

interface FolderData {
  path: string;
  folderName: string;
}

export default function FolderList(): React.JSX.Element {
  const musicContext: MusicContextData = React.useContext(MusicContext);

  // Validate if the user music is empty
  if (!musicContext?.totalCount) return <EmptyMusic />;

  // Validate if the user music is not detected
  if (musicContext == null) return <MusicNotDetected />;

  const folder: Array<FolderData> = musicContext.assets
    .map((item) => {
      // Map music data uri
      const splitedFilePath: Array<string> = item.uri.split("/");
      const folderName: string = splitedFilePath[splitedFilePath.length - 2];
      const path: string = item.uri.substring(0, item.uri.lastIndexOf("/"));

      return {
        folderName,
        path,
      };
    })
    .filter(
      // To removes duplicates array datas
      (item, index, self) =>
        index === self.findIndex((t) => t.path === item.path)
    );

  return (
    <ScrollView style={styles.container}>
      {folder.map((item, i) => (
        <View style={styles.wrapper}>
          <Folder title={item.folderName} description={item.path} key={i} />
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
