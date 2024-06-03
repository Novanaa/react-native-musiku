import showToast from "./toast";
import { SoundObject } from "@/interfaces/audio";
import { SetSoundObject, usePlayerStore } from "@/stores/player";
import { AVPlaybackStatusSuccess, AVPlaybackStatusToSet, Audio } from "expo-av";

export async function play(playback: SoundObject): Promise<void> {
  try {
    const setSoundObject: SetSoundObject =
      usePlayerStore.getState().setSoundObject;

    const status: AVPlaybackStatusSuccess =
      (await playback.sound.playAsync()) as AVPlaybackStatusSuccess;
    setSoundObject({
      ...playback,
      status,
    });
  } catch (err) {
    showToast("Failed to play the music!");
  }
}

export async function pause(playback: SoundObject): Promise<void> {
  try {
    const setSoundObject: SetSoundObject =
      usePlayerStore.getState().setSoundObject;

    const status: AVPlaybackStatusSuccess =
      (await playback.sound.pauseAsync()) as AVPlaybackStatusSuccess;
    setSoundObject({
      ...playback,
      status,
    });
  } catch (err) {
    showToast("Failed to pause the music!");
  }
}

export async function createMusicPlayerInstance(
  uri: string,
  options?: AVPlaybackStatusToSet
): Promise<SoundObject> {
  const playback: Awaited<SoundObject> = (await Audio.Sound.createAsync(
    { uri },
    options
  )) as SoundObject;

  return playback;
}
