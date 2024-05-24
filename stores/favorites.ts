import FavoriteRepository from "@/repository/favorite.repository";
import { StoreApi, UseBoundStore, create } from "zustand";

export type RefreshFavoritesMusic = () => void;

interface FavoritesState {
  favorites: string;
  refresh: RefreshFavoritesMusic;
}

export const useFavoritesMusic: UseBoundStore<StoreApi<FavoritesState>> =
  create<FavoritesState>((set) => ({
    favorites: FavoriteRepository.getFavorites(),
    refresh: () =>
      set(() => ({
        favorites: FavoriteRepository.getFavorites(),
      })),
  }));
