import { Playlist, PlaylistScheme } from "@/interfaces/playlist";
import PlaylistRepository from "@/repository/playlist.repository";
import uuid from "react-native-uuid";

export default function savePlaylist(title: string): Playlist {
  const latestPlaylistState: PlaylistScheme = JSON.parse(
    PlaylistRepository.getPlaylist()
  );

  const newPlaylist: Playlist = {
    createdAt: new Date().getTime(),
    id: String(uuid.v4()),
    songs: [],
    title,
    totalSongs: 0,
  };

  PlaylistRepository.setPlaylist({
    totalPlaylist: latestPlaylistState.totalPlaylist + 1,
    playlist: [...latestPlaylistState.playlist, newPlaylist],
  });

  return newPlaylist;
}
