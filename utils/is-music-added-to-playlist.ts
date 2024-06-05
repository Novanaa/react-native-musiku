import { Playlist, PlaylistScheme } from "@/interfaces/playlist";
import * as MediaLibrary from "expo-media-library";
import PlaylistRepository from "@/repository/playlist.repository";
import getPlaylistIndex from "./get-playlist-index";

export default function isMusicAddedToPlaylist(
  playlist: Playlist,
  music: MediaLibrary.Asset
): boolean {
  const latestPlaylistState: PlaylistScheme = JSON.parse(
    PlaylistRepository.getPlaylist()
  );

  // Get playlist index number
  const playlistIndex: number = getPlaylistIndex({
    list: latestPlaylistState,
    playlistId: playlist.id,
  });

  // Find if the music is undefined or not
  return (
    latestPlaylistState.playlist[playlistIndex].songs.find(
      (state) => state.uri === music.uri
    ) !== undefined
  );
}
