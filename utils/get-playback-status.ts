/* eslint-disable no-unused-vars */

import { usePlayerStore } from "@/stores/player";
import { AVPlaybackStatusSuccess } from "expo-av";
import { SoundObject } from "expo-av/build/Audio";

export default function getPlaybackStatus(
  callback: (status: AVPlaybackStatusSuccess) => void
): void {
  const soundObject: SoundObject = usePlayerStore.getState()
    .soundObject as SoundObject;

  soundObject?.sound.setOnPlaybackStatusUpdate((state) =>
    callback(state as AVPlaybackStatusSuccess)
  );
}
