import {
  Image,
  StyleSheet,
  View,
  TouchableHighlight,
  TouchableOpacity,
  TouchableHighlightProps,
} from "react-native";
import React from "react";
import Text from "./text";
import assests from "@/constants/assests";
import { borderRadius } from "@/constants/styles";
import colors from "@/constants/colors";

interface MusicProps extends TouchableHighlightProps {
  title: string;
  description: string;
}

export default function Music(props: MusicProps): React.JSX.Element {
  return (
    <TouchableHighlight
      activeOpacity={0.6}
      underlayColor={colors.light.background + "50"}
      style={styles.container}
      // Music player action
      onPress={() => "test"}
    >
      <View style={styles.wrapper}>
        <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
          <Image source={assests.icons.music} alt="test" style={styles.icon} />
          <View style={styles.metadata}>
            <Text style={styles.title} numberOfLines={1}>
              {props.title}
            </Text>
            <Text numberOfLines={1} style={styles.description}>
              {props.description}
            </Text>
          </View>
        </View>
        <TouchableOpacity>
          <Image
            alt="options"
            source={assests.icons.musicOptions}
            width={40}
            height={40}
          />
        </TouchableOpacity>
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius,
    paddingHorizontal: 6,
    paddingVertical: 10,
    flex: 1,
  },
  wrapper: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    justifyContent: "space-between",
  },
  icon: {
    borderRadius,
    width: 28,
    height: 28,
  },
  metadata: {
    gap: 1,
    width: "80%",
  },
  title: {
    fontFamily: "medium",
  },
  description: {
    fontSize: 10.5,
    opacity: 0.8,
  },
});
