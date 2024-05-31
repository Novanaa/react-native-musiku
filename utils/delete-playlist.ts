import { Playlist, PlaylistScheme } from "@/interfaces/playlist";
import PlaylistRepository from "@/repository/playlist.repository";
import showToast from "./toast";

export default function deletePlaylist(playlist: Playlist): void {
  const latestPlaylistState: PlaylistScheme = JSON.parse(
    PlaylistRepository.getPlaylist()
  );
  const playlistIndex: number = latestPlaylistState.playlist
    .map((state) => state.id)
    .indexOf(playlist.id);

  latestPlaylistState.playlist.splice(playlistIndex, 1);

  PlaylistRepository.setPlaylist({
    ...latestPlaylistState,
    totalPlaylist: latestPlaylistState.totalPlaylist - 1,
  });

  showToast(`Successfully deleted "${playlist.title}" playlist`);
}
