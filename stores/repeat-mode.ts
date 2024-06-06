/* eslint-disable no-unused-vars */

import { RepeatMode } from "@/interfaces/repeat-mode";
import RepeatModeRepository from "@/repository/repeat-mode.repository";
import { StoreApi, UseBoundStore, create } from "zustand";

export type RefreshRepeatMode = () => void;

export type SetRepeatMode = (state: RepeatMode) => void;

export interface RepeatModeState {
  repeatMode: RepeatMode;
  refreshRepeatMode: RefreshRepeatMode;
  setRepeatMode: SetRepeatMode;
}

export const useRepeatModeStore: UseBoundStore<StoreApi<RepeatModeState>> =
  create<RepeatModeState>((set, get) => ({
    repeatMode: RepeatModeRepository.getRepeatModeState(),
    setRepeatMode: (state) => {
      RepeatModeRepository.setRepeatModeState(state);

      get().refreshRepeatMode();
    },
    refreshRepeatMode: () =>
      set(() => ({
        repeatMode: RepeatModeRepository.getRepeatModeState(),
      })),
  }));
