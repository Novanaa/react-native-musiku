import { PlaylistScheme } from "@/interfaces/playlist";

interface GetPlaylistIndexParams {
  playlistId: string;
  list: PlaylistScheme;
}

export default function getPlaylistIndex(
  params: GetPlaylistIndexParams
): number {
  return params.list.playlist
    .map((state) => state.id)
    .indexOf(params.playlistId);
}
