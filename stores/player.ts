/* eslint-disable no-unused-vars */

import { create } from "zustand";
import PlayerRepository from "@/repository/player.repository";
import { CurrentMusicPlayed } from "@/interfaces/audio";

export type RefreshCurrentMusicPlayed = () => void;

export type IsPlayingSetter = (value: boolean) => void;

export type SetCurrentMusicPlayed = (data: CurrentMusicPlayed) => void;

export type SetIsLoading = (value: boolean) => void;

export interface PlayerState {
  currentMusicPlayed: string;
  setCurrentMusicPlayed: SetCurrentMusicPlayed;
  refreshCurrentMusicPlayed: RefreshCurrentMusicPlayed;
}

export const usePlayerStore = create<PlayerState>((set, get) => ({
  currentMusicPlayed: PlayerRepository.getCurrentMusicPlayed(),
  setCurrentMusicPlayed: (data) => {
    PlayerRepository.setCurrentMusicPlayed(data);

    get().refreshCurrentMusicPlayed();
  },
  refreshCurrentMusicPlayed: () =>
    set(() => ({
      currentMusicPlayed: PlayerRepository.getCurrentMusicPlayed(),
    })),
}));
