import { create, StoreApi, UseBoundStore } from "zustand";

export interface SortByState {
  setIsSortByStateStored: SortBySetter;
  isSortByStateStored: boolean;
}

export type SortBySetter = (state: boolean) => void;

export const useSortByStore: UseBoundStore<StoreApi<SortByState>> =
  create<SortByState>((set) => ({
    isSortByStateStored: false,
    setIsSortByStateStored: (state: boolean) =>
      set(() => ({ isSortByStateStored: state })),
  }));
