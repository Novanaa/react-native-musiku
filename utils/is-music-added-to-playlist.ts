import { Playlist, PlaylistScheme } from "@/interfaces/playlist";
import * as MediaLibrary from "expo-media-library";
import PlaylistRepository from "@/repository/playlist.repository";

export default function isMusicAddedToPlaylist(
  playlist: Playlist,
  music: MediaLibrary.Asset
): boolean {
  const latestPlaylistState: PlaylistScheme = JSON.parse(
    PlaylistRepository.getPlaylist()
  );

  const playlistIndex: number = latestPlaylistState.playlist
    .map((state) => state.id)
    .indexOf(playlist.id);

  return latestPlaylistState.playlist[playlistIndex].songs
    .map((state) => state.uri)
    .includes(music.uri);
}
