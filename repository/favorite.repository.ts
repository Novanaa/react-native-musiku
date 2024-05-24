import Favorites from "@/interfaces/favorites";
import * as SecureStore from "expo-secure-store";

export default class FavoriteRepository {
  public static favoriteKey: string = "favorites";

  public static getFavorites(): string {
    return SecureStore.getItem(this.favoriteKey) as string;
  }

  public static setFavorites(state: Favorites): void {
    return SecureStore.setItem(this.favoriteKey, JSON.stringify(state));
  }
}
