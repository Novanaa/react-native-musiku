import * as MediaLibrary from "expo-media-library";

export type Playlist = {
  id: string;
  title: string;
  totalSongs: number;
  songs: Array<MediaLibrary.Asset>;
};

export type PlaylistScheme = {
  playlist: Array<Playlist>;
  totalPlaylist: number;
};
