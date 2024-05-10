import React from "react";
import { ViewProps } from "react-native";
import { MusicContext, MusicContextData } from "./music-provider";

export type FolderContextData = Array<{
  path: string;
  folderName: string;
}> | null;

export const FolderContext: React.Context<FolderContextData> =
  React.createContext<FolderContextData>(null);

export default function FolderProvider(props: ViewProps): React.JSX.Element {
  const musicContext: MusicContextData = React.useContext(MusicContext);

  if (!musicContext) throw new Error("Music context doesn't defined");

  const folder: FolderContextData = musicContext.assets
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
    <FolderContext.Provider value={folder}>
      {props.children}
    </FolderContext.Provider>
  );
}
