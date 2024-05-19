import { StoreApi, UseBoundStore, create } from "zustand";
import { useMusicStore } from "./music";

export type Folder = Array<{
  path: string;
  folderName: string;
}> | null;

export interface FolderState {
  folder: Folder;
}

export const useFolderStore: UseBoundStore<StoreApi<FolderState>> =
  create<FolderState>(() => ({
    folder: null,
  }));
