/* eslint-disable no-unused-vars */

import {
  PlayerState,
  SetCurrentMusicPlayed,
  usePlayerStore,
} from "@/stores/player";
import { CurrentMusicPlayed } from "@/interfaces/audio";
import * as MediaLibrary from "expo-media-library";
import showToast from "./toast";
import TrackPlayer from "react-native-track-player";
import { Music, useMusicStore } from "@/stores/music";

export default async function playMusic(
  item: CurrentMusicPlayed
): Promise<void> {
  try {
    const { setCurrentMusicPlayed }: PlayerState = usePlayerStore.getState();

    await TrackPlayer.load({
      url: item.music.uri,
      duration: item.music.duration,
      title: item.music.filename,
      artwork: require("@/assets/images/music-player-placeholder.jpg"),
      date: new Date().toString(),
      artist: "Unknown Artist",
    });

    await TrackPlayer.seekTo(item.currentDuration);
    await TrackPlayer.play();

    setCurrentMusicPlayed(item);
  } catch (err) {
    showToast("Failed to play the music, something wrong happend!");
  }
}

export async function playNextMusic(music: MediaLibrary.Asset): Promise<void> {
  const { setCurrentMusicPlayed }: PlayerState = usePlayerStore.getState();

  const allMusic: Music = useMusicStore.getState().music as Music;
  const allMusicLength: number = allMusic?.assets.length - 1;
  const musicIndex: number = allMusic?.assets
    .map((state) => state.uri)
    .indexOf(music.uri);
  const musicItemIndex: number =
    musicIndex == allMusicLength ? 0 : musicIndex + 1;
  const musicItem: MediaLibrary.Asset = allMusic?.assets[musicItemIndex];

  setCurrentMusicPlayed({
    music: musicItem,
    currentDuration: 0,
  });

  await playMusic({
    music: musicItem,
    currentDuration: 0,
  });
}

export async function playPrevMusic(music: MediaLibrary.Asset): Promise<void> {
  const { setCurrentMusicPlayed }: PlayerState = usePlayerStore.getState();

  const allMusic: Music = useMusicStore.getState().music as Music;
  const allMusicLength: number = allMusic?.assets.length - 1;
  const musicIndex: number =
    allMusic?.assets.map((state) => state.uri).indexOf(music.uri) - 1;
  const musicItemIndex: number = musicIndex == -1 ? allMusicLength : musicIndex;
  const musicItem: MediaLibrary.Asset = allMusic?.assets[musicItemIndex];

  setCurrentMusicPlayed({
    music: musicItem,
    currentDuration: 0,
  });

  await playMusic({
    music: musicItem,
    currentDuration: 0,
  });
}

export async function pauseMusic(position: number): Promise<void> {
  const setCurrentMusicPlayed: SetCurrentMusicPlayed =
    usePlayerStore.getState().setCurrentMusicPlayed;
  const currentMusicPlayed: CurrentMusicPlayed = JSON.parse(
    usePlayerStore.getState().currentMusicPlayed
  );

  await TrackPlayer.pause();

  setCurrentMusicPlayed({
    music: currentMusicPlayed.music,
    currentDuration: position,
  });
}
