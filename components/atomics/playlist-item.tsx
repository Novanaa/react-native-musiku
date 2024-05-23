import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";
import Text from "./text";
import AlbumSVG from "@/assets/icons/album.svg";
import ArrowRightSVG from "@/assets/icons/arrow-right.svg";

interface PlaylistProps extends TouchableOpacityProps {
  title: string;
  description: string;
}

function Playlist(props: PlaylistProps): React.JSX.Element {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      style={styles.container}
      onPress={() => console.log("test")}
    >
      <View style={styles.headerWrapper}>
        <AlbumSVG width={38} height={38} />
        <View>
          <Text style={styles.title} numberOfLines={1}>
            {props.title}
          </Text>
          <Text style={styles.description} numberOfLines={1}>
            {props.description}
          </Text>
        </View>
      </View>
      <View>
        <ArrowRightSVG width={17} height={17} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
    paddingVertical: 12,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    opacity: 0.85,
  },
  headerWrapper: {
    gap: 10,
    alignItems: "center",
    flexDirection: "row",
    width: "75%",
  },
  title: {
    fontFamily: "medium",
    fontSize: 16,
  },
  description: {
    fontSize: 12,
    opacity: 0.8,
  },
});

export default React.memo(Playlist);
