/* eslint-disable no-unused-vars */

import { StoreApi, UseBoundStore, create } from "zustand";
import * as MediaLibrary from "expo-media-library";
import getMusic from "@/utils/get-music";

export type Music = MediaLibrary.PagedInfo<MediaLibrary.AssetInfo>;

export type MusicSetter = (state: Music) => void;

export type RefreshMusic = () => void;

export interface MusicStoreState {
  music: Music | null;
  setMusic: MusicSetter;
  refresh: RefreshMusic;
}

export const useMusicStore: UseBoundStore<StoreApi<MusicStoreState>> =
  create<MusicStoreState>((set) => ({
    music: null,
    setMusic: (state) => set(() => ({ music: state })),
    refresh: () => {
      getMusic().then((state) => set(() => ({ music: state })));
    },
  }));
