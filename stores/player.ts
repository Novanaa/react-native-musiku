/* eslint-disable no-unused-vars */

import { create } from "zustand";
import * as MediaLibrary from "expo-media-library";

export type GetCurrentMusicPlayed = () => MediaLibrary.Asset | null;

export type SetCurrentMusicPlayed = (music: MediaLibrary.Asset) => void;

interface PlayerState {
  getCurrentMusicPlayed: GetCurrentMusicPlayed;
  setCurrentMusicPlayed: SetCurrentMusicPlayed;
}

export const usePlayerStore = create<PlayerState>((set) => ({
  getCurrentMusicPlayed: () => null,
  setCurrentMusicPlayed: (music: MediaLibrary.Asset) =>
    set(() => ({
      getCurrentMusicPlayed: () => music,
    })),
}));
