import * as SecureStore from "expo-secure-store";

export default class ApplicationRepository {
  public static isAppFirstLaunchedStateKey: string = "app_init";

  public static getIsAppFirstLaunchedState(): string {
    return SecureStore.getItem(this.isAppFirstLaunchedStateKey) as string;
  }

  public static setIsAppFirstLaunchedState(state: string): void {
    SecureStore.setItem(this.isAppFirstLaunchedStateKey, state);
  }
}
