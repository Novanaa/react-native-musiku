/* eslint-disable no-unused-vars */

import { StoreApi, UseBoundStore, create } from "zustand";

export type Folder = Array<{
  path: string;
  folderName: string;
}> | null;

export type FolderSetter = (state: Folder) => void;

export interface FolderState {
  folder: Folder;
  setFolder: FolderSetter;
}

export const useFolderStore: UseBoundStore<StoreApi<FolderState>> =
  create<FolderState>((set) => ({
    folder: null,
    setFolder: (state) => set(() => ({ folder: state })),
  }));
