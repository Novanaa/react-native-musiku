import Favorites from "@/interfaces/favorites";
import FavoriteRepository from "@/repository/favorite.repository";
import * as MediaLibrary from "expo-media-library";
import showToast from "./toast";

export default function addMusicFavorites(music: MediaLibrary.Asset): void {
  const latestFavoritesState: Favorites = JSON.parse(
    FavoriteRepository.getFavorites()
  );

  FavoriteRepository.setFavorites({
    total: latestFavoritesState.total + 1,
    assets: [...latestFavoritesState.assets, music],
  });

  showToast(`Successfully added music to favorites!`);
}
