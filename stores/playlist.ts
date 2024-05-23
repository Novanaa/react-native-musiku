import { PlaylistScheme } from "@/interfaces/playlist";
import PlaylistRepository from "@/repository/playlist.repository";
import { StoreApi, UseBoundStore, create } from "zustand";

export type RefreshPlaylist = () => void;

export interface PlaylistState {
  refresh: RefreshPlaylist;
  playlist: string;
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
  }));
