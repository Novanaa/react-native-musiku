/* eslint-disable no-unused-vars */

import getFolder from "@/utils/get-folder";
import getMusic from "@/utils/get-music";
import { StoreApi, UseBoundStore, create } from "zustand";

export type Folder = Array<{
  path: string;
  folderName: string;
}> | null;

export type FolderSetter = (state: Folder) => void;

export type RefreshFolder = () => void;

export interface FolderState {
  folder: Folder;
  setFolder: FolderSetter;
  refresh: RefreshFolder;
}

export const useFolderStore: UseBoundStore<StoreApi<FolderState>> =
  create<FolderState>((set) => ({
    folder: null,
    setFolder: (state) => set(() => ({ folder: state })),
    refresh: () => {
      getMusic().then((state) =>
        set(() => ({
          folder: getFolder(state),
        }))
      );
    },
  }));
