import Favorites from "@/interfaces/favorites";
import storage from "@/libs/storage";

export default class FavoriteRepository {
  public static favoriteKey: string = "favorites";

  public static getFavorites(): string {
    return storage.getString(this.favoriteKey) as string;
  }

  public static setFavorites(state: Favorites): void {
    return storage.set(this.favoriteKey, JSON.stringify(state));
  }
}
