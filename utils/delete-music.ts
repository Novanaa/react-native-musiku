/* eslint-disable no-unused-vars */

import * as MediaLibrary from "expo-media-library";
import isMusicFavorited from "./is-music-favorited";
import Favorites from "@/interfaces/favorites";
import { useFavoritesMusic } from "@/stores/favorites";
import removeFavorites from "./remove-favorites";
import { useMusicStore } from "@/stores/music";
import showToast from "./toast";

export default async function deleteMusic(
  music: MediaLibrary.Asset
): Promise<void> {
  try {
    const favoritesMusic: Favorites = JSON.parse(
      useFavoritesMusic.getState().favorites
    );
    const isMusicFavoritedState: boolean = isMusicFavorited(
      favoritesMusic,
      music
    );

    if (isMusicFavoritedState) removeFavorites(music);

    await MediaLibrary.deleteAssetsAsync(music);
    useMusicStore.getState().refresh();
    useFavoritesMusic.getState().refresh();
    showToast("Successfully deleted music!");
  } catch (err) {
    showToast("Failed to delete the music!");
  }
}
