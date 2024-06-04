/* eslint-disable no-unused-vars */

import showToast from "./toast";
import { CurrentMusicPlayed, SoundObject } from "@/interfaces/audio";
import {
  SetCurrentMusicPlayed,
  SetSoundObject,
  usePlayerStore,
} from "@/stores/player";
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
    { ...options, isLooping: true }
  )) as SoundObject;

  return playback;
}

export async function handlePause(
  status: AVPlaybackStatusSuccess
): Promise<void> {
  const soundObject: SoundObject = usePlayerStore.getState()
    .soundObject as SoundObject;
  const setCurrentMusicPlayed: SetCurrentMusicPlayed =
    usePlayerStore.getState().setCurrentMusicPlayed;
  const currentMusicPlayed: CurrentMusicPlayed = JSON.parse(
    usePlayerStore.getState().currentMusicPlayed
  );

  await pause(soundObject);
  setCurrentMusicPlayed({
    music: currentMusicPlayed.music,
    currentDuration: status?.positionMillis as number,
  });
}
