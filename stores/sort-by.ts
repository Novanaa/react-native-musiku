import SortBy from "@/interfaces/sort-by";
import SortByRepository from "@/repository/sort-by.repository";
import { StoreApi, UseBoundStore, create } from "zustand";

export type RefreshSortByState = () => void;

/* eslint-disable no-unused-vars */
export type IsSortMusicLoadingSetter = (state: boolean) => void;

export interface SortByState {
  sortBy: SortBy;
  refresh: RefreshSortByState;
}

export const useSortByStore: UseBoundStore<StoreApi<SortByState>> =
  create<SortByState>((set) => ({
    sortBy: SortByRepository.getSortByState(),
    refresh: () =>
      set(() => ({
        sortBy: SortByRepository.getSortByState(),
      })),
  }));
