import { Audio, AVPlaybackStatusSuccess } from "expo-av";

export interface SoundObject extends Audio.SoundObject {
  status: AVPlaybackStatusSuccess;
}
