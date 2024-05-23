import * as SecureStore from "expo-secure-store";
import { PlaylistScheme } from "@/interfaces/playlist";

export default class PlaylistRepository {
  public static playlistKey: string = "playlist";

  public static async getPlaylistAsync(): Promise<PlaylistScheme> {
    const parsedPlaylist: Awaited<PlaylistScheme> = JSON.parse(
      (await SecureStore.getItemAsync(this.playlistKey)) as string
    );

    return parsedPlaylist;
  }

  public static getPlaylist(): PlaylistScheme {
    const parsedPlaylist: PlaylistScheme = JSON.parse(
      SecureStore.getItem(this.playlistKey) as string
    );

    return parsedPlaylist;
  }

  public static setPlaylist(state: PlaylistScheme): void {
    return SecureStore.setItem(this.playlistKey, JSON.stringify(state));
  }

  public static async setPlaylistAsync(state: PlaylistScheme): Promise<void> {
    return await SecureStore.setItemAsync(
      this.playlistKey,
      JSON.stringify(state)
    );
  }
}
