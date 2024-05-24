import React from "react";
import { StyleSheet, View } from "react-native";
import Text from "../atomics/text";
import { IconButton } from "../atomics/button";
import SearchBar from "../atomics/search-bar";
import { borderColor } from "@/constants/colors";
import SparklesSVG from "@/assets/icons/sparkles.svg";
import PlusCircleSVG from "@/assets/icons/plus-circle.svg";
import HeartSVG from "@/assets/icons/heart.svg";
import MusicOptionsSVG from "@/assets/icons/music-options.svg";
import { useDebounce } from "use-debounce";
import {
  SearchPlaylistKeywordSetter,
  usePlaylistStore,
} from "@/stores/playlist";
import PlaylistHeaderOptions from "../atomics/playlist-header-options";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { useRouter } from "expo-router";
import { ExpoRouter } from "expo-router/types/expo-router";

export default function PlaylistHeader(): React.JSX.Element {
  const router: ExpoRouter.Router = useRouter();
  const drawerOptionsRef: React.MutableRefObject<BottomSheetModalMethods | null> =
    React.useRef<BottomSheetModalMethods | null>(null);
  const setPlaylistSearchKeyword: SearchPlaylistKeywordSetter =
    usePlaylistStore((state) => state.setSearchPlaylistKeyword);
  const [textValue, setTextValue] = React.useState<string>("");
  const [keyword] = useDebounce<string>(textValue, 300);

  React.useEffect(() => {
    setPlaylistSearchKeyword(keyword);
  }, [keyword]);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.headerWrapper}>
          <View style={styles.titleWrapper}>
            <SparklesSVG width={22} height={22} />
            <Text style={styles.title}>Playlist</Text>
          </View>
          <View style={styles.iconWrapper}>
            <IconButton icon={<PlusCircleSVG width={26} height={26} />} />
            <IconButton
              icon={
                <HeartSVG
                  width={26}
                  height={26}
                  onPress={() => router.push("/favorite")}
                />
              }
            />
            <IconButton
              icon={<MusicOptionsSVG width={26} height={26} />}
              onPress={() => drawerOptionsRef.current?.present()}
            />
          </View>
        </View>
        <View style={styles.searchWrapper}>
          <SearchBar onChangeText={(text) => setTextValue(text)} />
        </View>
      </View>
      <PlaylistHeaderOptions modalRef={drawerOptionsRef} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    top: 60,
    paddingBottom: 15,
  },
  headerWrapper: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    borderBottomColor: borderColor,
    borderBottomWidth: 0.5,
    paddingBottom: 15,
  },
  titleWrapper: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },
  searchWrapper: {
    zIndex: 2,
    top: 15,
  },
  iconWrapper: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    top: 5,
  },
  title: {
    fontFamily: "bold",
    fontSize: 19,
  },
});
