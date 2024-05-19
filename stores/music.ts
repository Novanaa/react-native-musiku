/* eslint-disable no-unused-vars */

import { StoreApi, UseBoundStore, create } from "zustand";
import * as MediaLibrary from "expo-media-library";

export type Music = MediaLibrary.PagedInfo<MediaLibrary.AssetInfo>;

export type MusicSetter = (state: Music) => void;

export interface MusicStoreState {
  music: Music | null;
  setMusic: MusicSetter;
}

export const useMusicStore: UseBoundStore<StoreApi<MusicStoreState>> =
  create<MusicStoreState>((set) => ({
    music: null,
    setMusic: (state) => set(() => ({ music: state })),
  }));
