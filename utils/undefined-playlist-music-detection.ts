import { PlaylistScheme } from "@/interfaces/playlist";
import * as MediaLibrary from "expo-media-library";
import removeFromPlaylist from "./remove-from-playlist";

export default function undefinedPlaylistMusicDetection(
  list: PlaylistScheme
): void {
  list.playlist.flatMap((value) => {
    value.songs.map((song) => {
      MediaLibrary.getAssetInfoAsync(song).then((info) => {
        if (!info) removeFromPlaylist(value, song);
      });
    });
  });
}
