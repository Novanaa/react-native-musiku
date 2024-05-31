import storage from "@/libs/storage";
import { PlaylistScheme } from "@/interfaces/playlist";

export default class PlaylistRepository {
  public static playlistKey: string = "playlist";

  public static getPlaylist(): string {
    return storage.getString(this.playlistKey) as string;
  }

  public static setPlaylist(state: PlaylistScheme): void {
    return storage.set(this.playlistKey, JSON.stringify(state));
  }
}
