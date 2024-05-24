/* eslint-disable no-unused-vars */

import PlaylistRepository from "@/repository/playlist.repository";
import { StoreApi, UseBoundStore, create } from "zustand";

export type RefreshPlaylist = () => void;

export type SearchPlaylistKeywordSetter = (text: string) => void;

export interface PlaylistState {
  refresh: RefreshPlaylist;
  playlist: string;
  setSearchPlaylistKeyword: SearchPlaylistKeywordSetter;
  searchPlaylistKeyword: string;
}

export const usePlaylistStore: UseBoundStore<StoreApi<PlaylistState>> =
  create<PlaylistState>((set) => ({
    refresh: () => {
      PlaylistRepository.getPlaylistAsync().then((state) =>
        set(() => ({
          playlist: state,
        }))
      );
    },
    playlist: PlaylistRepository.getPlaylist(),
    searchPlaylistKeyword: "",
    setSearchPlaylistKeyword: (text: string) =>
      set(() => ({
        searchPlaylistKeyword: text,
      })),
  }));
