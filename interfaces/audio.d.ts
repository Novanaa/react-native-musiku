import { Audio, AVPlaybackStatusSuccess } from "expo-av";
import * as MediaLibrary from "expo-media-library";

export interface SoundObject extends Audio.SoundObject {
  status: AVPlaybackStatusSuccess;
}

export interface CurrentMusicPlayed {
  music: MediaLibrary.Asset;
  currentDuration: number;
}
