import { Playlist, PlaylistScheme } from "@/interfaces/playlist";
import PlaylistRepository from "@/repository/playlist.repository";
import * as MediaLibrary from "expo-media-library";
import showToast from "./toast";
import { usePlaylistStore } from "@/stores/playlist";
import getPlaylistIndex from "./get-playlist-index";

export default function addMusicPlaylist(
  playlist: Playlist,
  music: MediaLibrary.Asset
): void {
  const latestPlaylistState: PlaylistScheme = JSON.parse(
    PlaylistRepository.getPlaylist()
  );

  const playlistIndex: number = getPlaylistIndex({
    playlistId: playlist.id,
    list: latestPlaylistState,
  });

  latestPlaylistState.playlist.splice(playlistIndex, 1, {
    ...playlist,
    songs: [...playlist.songs, music],
    totalSongs: playlist.totalSongs + 1,
  });

  PlaylistRepository.setPlaylist(latestPlaylistState);
  usePlaylistStore.getState().refresh();
  showToast(`Successfully added music to "${playlist.title}" playlist`);
}
