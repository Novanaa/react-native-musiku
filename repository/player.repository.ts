import { CurrentMusicPlayed } from "@/interfaces/audio";
import storage from "@/libs/storage";

export default class PlayerRepository {
  public static playerKey: string = "player";

  public static getCurrentMusicPlayed(): string {
    return storage.getString(this.playerKey) as string;
  }

  public static setCurrentMusicPlayed(music: CurrentMusicPlayed | null): void {
    return storage.set(this.playerKey, JSON.stringify(music));
  }
}
