import { RepeatMode } from "@/interfaces/repeat-mode";
import storage from "@/libs/storage";

export default class RepeatModeRepository {
  public static repeatModeKey: string = "repeat_mode";

  public static getRepeatModeState(): RepeatMode {
    return storage.getString(this.repeatModeKey) as RepeatMode;
  }

  public static setRepeatModeState(state: RepeatMode): void {
    return storage.set(this.repeatModeKey, state);
  }
}
