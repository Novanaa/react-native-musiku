/* eslint-disable no-unused-vars */

import { create } from "zustand";
import PlayerRepository from "@/repository/player.repository";
import { CurrentMusicPlayed, SoundObject } from "@/interfaces/audio";

export type RefreshCurrentMusicPlayed = () => void;

export type IsPlayingSetter = (value: boolean) => void;

export type SetSoundObject = (sound: SoundObject | null) => void;

export type SetCurrentMusicPlayed = (data: CurrentMusicPlayed) => void;

export interface PlayerState {
  currentMusicPlayed: string;
  setCurrentMusicPlayed: SetCurrentMusicPlayed;
  refreshCurrentMusicPlayed: RefreshCurrentMusicPlayed;
  soundObject: SoundObject | null;
  setSoundObject: SetSoundObject;
}

export const usePlayerStore = create<PlayerState>((set, get) => ({
  soundObject: null,
  currentMusicPlayed: PlayerRepository.getCurrentMusicPlayed(),
  setCurrentMusicPlayed: (data) => {
    PlayerRepository.setCurrentMusicPlayed(data);

    get().refreshCurrentMusicPlayed();
  },
  setSoundObject: (param) =>
    set({
      soundObject: param,
    }),
  refreshCurrentMusicPlayed: () =>
    set(() => ({
      currentMusicPlayed: PlayerRepository.getCurrentMusicPlayed(),
    })),
}));
