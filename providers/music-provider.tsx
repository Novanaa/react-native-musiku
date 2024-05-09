import React from "react";
import * as MediaLibrary from "expo-media-library";
import getMusic from "@/utils/get-music";
import { ViewProps } from "react-native";

export type MusicContextData =
  MediaLibrary.PagedInfo<MediaLibrary.Asset> | null;

export const MusicContext: React.Context<MusicContextData> =
  React.createContext<MusicContextData>(null);

export default function MusicProvider(props: ViewProps): React.JSX.Element {
  const [music, setMusic] = React.useState<MusicContextData>(null);

  React.useEffect(() => {
    getMusic().then((state) => setMusic(state));
  }, []);

  return (
    <MusicContext.Provider value={music}>
      {props.children}
    </MusicContext.Provider>
  );
}
