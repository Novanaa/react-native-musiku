import React from "react";
import { useLocalSearchParams } from "expo-router";
import { StyleSheet, FlatList, View } from "react-native";
import Music from "@/components/atomics/music";
import { Music as IMusic, useMusicStore } from "@/stores/music";

export interface FolderSearchParams {
  path: string;
}

export default function FolderScreen(): React.JSX.Element {
  const music: IMusic = useMusicStore((state) => state.music) as IMusic;
  const params: FolderSearchParams =
    // @ts-expect-error interface conflict
    useLocalSearchParams() as FolderSearchParams;

  const assests = React.useMemo(
    () => music?.assets.filter((state) => state.uri.includes(params.path)),
    [music]
  );

  return (
    <FlatList
      data={assests}
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
