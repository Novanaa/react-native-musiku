import Music from "@/components/atomics/music";
import { EmptyPlaylistMusic } from "@/components/molecules/not-found";
import { Playlist as IPlaylist } from "@/interfaces/playlist";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { FlatList, StyleSheet, View } from "react-native";

interface PlaylistSearchParams {
  item: IPlaylist;
}

export default function Playlist(): React.JSX.Element {
  const params: PlaylistSearchParams =
    // @ts-expect-error interface conflict
    useLocalSearchParams() as PlaylistSearchParams;

  if (!params.item.totalSongs)
    return <EmptyPlaylistMusic playlist={params.item} />;

  return (
    <FlatList
      data={params.item.songs}
      style={styles.container}
      renderItem={(data) => (
        <View style={styles.wrapper}>
          <Music
            description="Unknown Artist - Unknown Album"
            title={data.item.filename}
            musicItem={data.item}
          />
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
