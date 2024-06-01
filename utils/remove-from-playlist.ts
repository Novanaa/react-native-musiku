import { Playlist, PlaylistScheme } from "@/interfaces/playlist";
import showToast from "./toast";
import PlaylistRepository from "@/repository/playlist.repository";
import * as MediaLibrary from "expo-media-library";

export default function removeFromPlaylist(
  playlist: Playlist,
  music: MediaLibrary.Asset
): void {
  // Get latest changes of playlist state
  const latestPlaylistState: PlaylistScheme = JSON.parse(
    PlaylistRepository.getPlaylist()
  );
  // Get playlist music array index
  const playlistIndex: number = latestPlaylistState.playlist
    .map((state) => state.id)
    .indexOf(playlist.id);

  // Get music array index
  const musicIndex: number = latestPlaylistState.playlist[playlistIndex].songs
    .map((state) => state.uri)
    .indexOf(music.uri);

  // Removes music from playlist
  latestPlaylistState.playlist[playlistIndex].songs.splice(musicIndex, 1);

  // Get latest changes of removed music playlist
  const removedMusicPlaylistState: Playlist =
    latestPlaylistState.playlist[playlistIndex];

  // Update playlist total songs
  latestPlaylistState.playlist.splice(playlistIndex, 1, {
    ...removedMusicPlaylistState,
    totalSongs: removedMusicPlaylistState.totalSongs - 1,
  });

  // Set new playlist to storage
  PlaylistRepository.setPlaylist(latestPlaylistState);

  showToast("Successfully removed music from playlist");
}
