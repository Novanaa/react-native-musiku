import Favorites from "@/interfaces/favorites";
import * as MediaLibrary from "expo-media-library";

export default function isMusicFavorited(
  favoritesMusic: Favorites,
  music: MediaLibrary.Asset
): boolean {
  return (
    favoritesMusic.assets.find((state) => state.uri === music.uri) !== undefined
  );
}
