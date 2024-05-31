import { Playlist, PlaylistScheme } from "@/interfaces/playlist";
import PlaylistRepository from "@/repository/playlist.repository";
import * as MediaLibrary from "expo-media-library";
import showToast from "./toast";

export default function addMusicPlaylist(
  playlist: Playlist,
  music: MediaLibrary.Asset
): void {
  const latestPlaylistState: PlaylistScheme = JSON.parse(
    PlaylistRepository.getPlaylist()
  );

  const playlistIndex: number = latestPlaylistState.playlist
    .map((state) => state.id)
    .indexOf(playlist.id);

  latestPlaylistState.playlist.splice(playlistIndex, 1, {
    ...playlist,
    songs: [...playlist.songs, music],
    totalSongs: playlist.totalSongs + 1,
  });

  PlaylistRepository.setPlaylist(latestPlaylistState);

  showToast(`Successfully added music to "${playlist.title}" playlist`);
}
