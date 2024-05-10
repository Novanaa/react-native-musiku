import React from "react";
import * as MediaLibrary from "expo-media-library";
import { ViewProps } from "react-native";

export type MusicContextData =
  MediaLibrary.PagedInfo<MediaLibrary.Asset> | null;

interface MusicProviderProps extends ViewProps {
  music: MediaLibrary.PagedInfo<MediaLibrary.Asset> | null;
}

export const MusicContext: React.Context<MusicContextData> =
  React.createContext<MusicContextData>(null);

export default function MusicProvider(
  props: MusicProviderProps
): React.JSX.Element {
  return (
    <MusicContext.Provider value={props.music}>
      {props.children}
    </MusicContext.Provider>
  );
}
