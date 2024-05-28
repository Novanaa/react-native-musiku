import PlaylistRepository from "@/repository/playlist.repository";
import { RefreshPlaylist } from "@/stores/playlist";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import React from "react";

interface ResetPlaylistParams {
  refreshPlaylist: RefreshPlaylist;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  drawerRef: React.MutableRefObject<null | BottomSheetModalMethods>;
}

export default async function resetPlaylist(
  params: ResetPlaylistParams
): Promise<void> {
  params.setIsLoading(true);
  await PlaylistRepository.setPlaylistAsync({
    totalPlaylist: 0,
    playlist: [],
  });

  params.setIsLoading(false);
  params.drawerRef.current?.close();
  params.refreshPlaylist();
}
