/* eslint-disable no-unused-vars */

import { PlayerState, usePlayerStore } from "@/stores/player";
import PlayerRepository from "@/repository/player.repository";
import { CurrentMusicPlayed, SoundObject } from "@/interfaces/audio";
import { createMusicPlayerInstance, play } from "./music-player";
import { AVPlaybackStatusToSet } from "expo-av";
import { Music, useMusicStore } from "@/stores/music";
import * as MediaLibrary from "expo-media-library";
import showToast from "./toast";

export default async function playMusic(
  item: CurrentMusicPlayed,
  options?: AVPlaybackStatusToSet
): Promise<void> {
  try {
    const {
      refreshCurrentMusicPlayed,
      soundObject,
      setIsLoading,
    }: PlayerState = usePlayerStore.getState();

    PlayerRepository.setCurrentMusicPlayed(item);
    refreshCurrentMusicPlayed();

    // Select other music
    if (soundObject && soundObject?.status.uri !== item.music?.uri) {
      setIsLoading(true);
      soundObject.sound.stopAsync();
      const sound: Awaited<SoundObject> = await createMusicPlayerInstance(
        item.music?.uri as string,
        options
      );

      play(sound);
      setIsLoading(false);
    }

    // Play music at the first time
    if (!soundObject) {
      setIsLoading(true);
      const sound: Awaited<SoundObject> = await createMusicPlayerInstance(
        item.music?.uri as string,
        options
      );

      play(sound);
      setIsLoading(true);
    }
  } catch (err) {
    showToast("Failed to play the music, something wrong happend!");
  }
}

export async function playNextMusic(music: MediaLibrary.Asset): Promise<void> {
  const { refreshCurrentMusicPlayed, setIsLoading }: PlayerState =
    usePlayerStore.getState();
  setIsLoading(true);

  const allMusic: Music = useMusicStore.getState().music as Music;
  const allMusicLength: number = allMusic?.assets.length - 1;
  const musicIndex: number = allMusic?.assets
    .map((state) => state.uri)
    .indexOf(music.uri);
  const musicItemIndex: number =
    musicIndex == allMusicLength ? 0 : musicIndex + 1;
  const musicItem: MediaLibrary.Asset = allMusic?.assets[musicItemIndex];

  PlayerRepository.setCurrentMusicPlayed({
    music: musicItem,
    currentDuration: 0,
  });
  refreshCurrentMusicPlayed();

  playMusic({
    music: musicItem,
    currentDuration: 0,
  });
  setIsLoading(false);
}

export async function playPrevMusic(music: MediaLibrary.Asset): Promise<void> {
  const { refreshCurrentMusicPlayed, setIsLoading }: PlayerState =
    usePlayerStore.getState();

  setIsLoading(true);
  const allMusic: Music = useMusicStore.getState().music as Music;
  const allMusicLength: number = allMusic?.assets.length - 1;
  const musicIndex: number =
    allMusic?.assets.map((state) => state.uri).indexOf(music.uri) - 1;
  const musicItemIndex: number = musicIndex == -1 ? allMusicLength : musicIndex;
  const musicItem: MediaLibrary.Asset = allMusic?.assets[musicItemIndex];

  PlayerRepository.setCurrentMusicPlayed({
    music: musicItem,
    currentDuration: 0,
  });
  refreshCurrentMusicPlayed();

  playMusic({
    music: musicItem,
    currentDuration: 0,
  });
  setIsLoading(false);
}
