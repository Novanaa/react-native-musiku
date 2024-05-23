import * as SecureStore from "expo-secure-store";
import { PlaylistScheme } from "@/interfaces/playlist";

export default class PlaylistRepository {
  public static playlistKey: string = "playlist";

  public static async getPlaylistAsync(): Promise<string> {
    return (await SecureStore.getItemAsync(this.playlistKey)) as string;
  }

  public static getPlaylist(): string {
    return SecureStore.getItem(this.playlistKey) as string;
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
