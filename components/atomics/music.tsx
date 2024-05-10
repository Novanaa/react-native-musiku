import {
  StyleSheet,
  View,
  TouchableHighlight,
  TouchableOpacity,
  TouchableHighlightProps,
} from "react-native";
import React from "react";
import Text from "./text";
import { svgAssests } from "@/constants/assests";
import { borderRadius } from "@/constants/styles";
import { underlayColor } from "@/constants/colors";
import SvgUri from "react-native-svg-uri";
import MusicOptions from "./music-options";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";

interface MusicProps extends TouchableHighlightProps {
  title: string;
  description: string;
}

export default function Music(props: MusicProps): React.JSX.Element {
  const drawerRef: React.MutableRefObject<null | BottomSheetModalMethods> =
    React.useRef(null);

  return (
    <>
      <TouchableHighlight
        activeOpacity={0.6}
        underlayColor={underlayColor}
        style={styles.container}
        // Music player action
        onPress={() => "open"}
      >
        <View style={styles.wrapper}>
          <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
            <SvgUri svgXmlData={svgAssests.music} width={28} height={28} />
            <View style={styles.metadata}>
              <Text style={styles.title} numberOfLines={1}>
                {props.title}
              </Text>
              <Text numberOfLines={1} style={styles.description}>
                {props.description}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => drawerRef.current?.present()}
            style={{ width: 30, height: 30 }}
          >
            <SvgUri svgXmlData={svgAssests.musicOptions} />
          </TouchableOpacity>
        </View>
      </TouchableHighlight>
      <MusicOptions modalRef={drawerRef} />
    </>
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
