import { EmptyFavoritesMusic } from "@/components/molecules/not-found";
import { default as IFavorites } from "@/interfaces/favorites";
import { useFavoritesMusic } from "@/stores/favorites";
import React from "react";
import { View } from "react-native";

export default function Favorites(): React.JSX.Element {
  const favoritedMusic: IFavorites = useFavoritesMusic((state) =>
    JSON.parse(state.favorites)
  );

  if (!favoritedMusic.total) return <EmptyFavoritesMusic />;

  return <View></View>;
}
