import PlaylistRepository from "@/repository/playlist.repository";
import { RefreshPlaylist } from "@/stores/playlist";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import React from "react";

interface ResetPlaylistParams {
  refreshPlaylist: RefreshPlaylist;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  drawerRef: React.MutableRefObject<null | BottomSheetModalMethods>;
}

export default function resetPlaylist(params: ResetPlaylistParams): void {
  params.setIsLoading(true);
  PlaylistRepository.setPlaylist({
    totalPlaylist: 0,
    playlist: [],
  });

  params.setIsLoading(false);
  params.drawerRef.current?.close();
  params.refreshPlaylist();
}
