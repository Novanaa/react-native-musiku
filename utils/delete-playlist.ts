import { Playlist, PlaylistScheme } from "@/interfaces/playlist";
import PlaylistRepository from "@/repository/playlist.repository";
import showToast from "./toast";
import getPlaylistIndex from "./get-playlist-index";

export default function deletePlaylist(playlist: Playlist): void {
  const latestPlaylistState: PlaylistScheme = JSON.parse(
    PlaylistRepository.getPlaylist()
  );
  const playlistIndex: number = getPlaylistIndex({
    list: latestPlaylistState,
    playlistId: playlist.id,
  });

  latestPlaylistState.playlist.splice(playlistIndex, 1);

  PlaylistRepository.setPlaylist({
    ...latestPlaylistState,
    totalPlaylist: latestPlaylistState.totalPlaylist - 1,
  });

  showToast(`Successfully deleted "${playlist.title}" playlist`);
}
