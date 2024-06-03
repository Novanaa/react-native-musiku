import Music from "@/components/atomics/music";
import { EmptyFavoritesMusic } from "@/components/molecules/not-found";
import { default as IFavorites } from "@/interfaces/favorites";
import { useFavoritesMusic } from "@/stores/favorites";
import React from "react";
import { FlatList, StyleSheet, View } from "react-native";

export default function Favorites(): React.JSX.Element {
  const favoritedMusic: IFavorites = useFavoritesMusic((state) =>
    JSON.parse(state.favorites)
  );

  if (!favoritedMusic.total) return <EmptyFavoritesMusic />;

  return (
    <FlatList
      style={styles.container}
      data={favoritedMusic.assets}
      renderItem={(data) => (
        <View style={styles.wrapper}>
          <Music musicItem={data.item} />
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  wrapper: {
    paddingHorizontal: 5,
  },
});
