import storage from "@/libs/storage";
import { CurrentMusicPlayed } from "@/stores/player";

export default class PlayerRepository {
  public static playerKey: string = "player";

  public static getCurrentMusicPlayed(): string {
    return storage.getString(this.playerKey) as string;
  }

  public static setCurrentMusicPlayed(music: CurrentMusicPlayed): void {
    return storage.set(this.playerKey, JSON.stringify(music));
  }
}
