import * as MediaLibrary from "expo-media-library";

export interface CurrentMusicPlayed {
  music: MediaLibrary.Asset;
  currentDuration: number;
}
