import Favorites from "@/interfaces/favorites";
import FavoriteRepository from "@/repository/favorite.repository";
import * as MediaLibrary from "expo-media-library";
import showToast from "./toast";

export default function removeFavorites(music: MediaLibrary.Asset): void {
  const latestFavoritesState: Favorites = JSON.parse(
    FavoriteRepository.getFavorites()
  );

  const filteredFavoritesMusicAssests = latestFavoritesState.assets.filter(
    (state) => state.uri !== music.uri
  );

  FavoriteRepository.setFavorites({
    total: latestFavoritesState.total - 1,
    assets: [...filteredFavoritesMusicAssests],
  });

  showToast(`Successfully remove music from favorites!`);
}
