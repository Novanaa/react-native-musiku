/* eslint-disable no-unused-vars */

import { create } from "zustand";
import * as MediaLibrary from "expo-media-library";
import PlayerRepository from "@/repository/player.repository";
import { SoundObject } from "@/interfaces/audio";

export type CurrentMusicPlayed = MediaLibrary.Asset | null;

export type RefreshCurrentMusicPlayed = () => void;

export type IsPlayingSetter = (value: boolean) => void;

export type SetSoundObject = (sound: SoundObject | null) => void;

export interface PlayerState {
  currentMusicPlayed: CurrentMusicPlayed;
  refreshCurrentMusicPlayed: RefreshCurrentMusicPlayed;
  soundObject: SoundObject | null;
  setSoundObject: SetSoundObject;
}

export const usePlayerStore = create<PlayerState>((set) => ({
  soundObject: null,
  currentMusicPlayed: JSON.parse(PlayerRepository.getCurrentMusicPlayed()),
  setSoundObject: (param) =>
    set({
      soundObject: param,
    }),
  refreshCurrentMusicPlayed: () =>
    set(() => ({
      currentMusicPlayed: JSON.parse(PlayerRepository.getCurrentMusicPlayed()),
    })),
}));
