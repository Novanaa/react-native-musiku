import { Playlist, PlaylistScheme } from "@/interfaces/playlist";
import PlaylistRepository from "@/repository/playlist.repository";

export default function deletePlaylist(playlist: Playlist): void {
  const latestPlaylistState: PlaylistScheme = JSON.parse(
    PlaylistRepository.getPlaylist()
  );

  latestPlaylistState.playlist.filter((state) => state.id == playlist.id);

  PlaylistRepository.setPlaylist({
    playlist: [...latestPlaylistState.playlist],
    totalPlaylist: latestPlaylistState.totalPlaylist - 1,
  });
}
