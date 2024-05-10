import { svgAssests } from "@/constants/assests";
import React from "react";
import { StyleSheet, View, TouchableHighlight } from "react-native";
import SvgUri from "react-native-svg-uri";
import Text from "./text";
import { underlayColor } from "@/constants/colors";
import { borderRadius } from "@/constants/styles";

interface FolderProps {
  title: string;
  description: string;
}

export default function Folder(props: FolderProps): React.JSX.Element {
  return (
    <TouchableHighlight
      style={styles.container}
      // onPress placeholder
      onPress={() => "test"}
      underlayColor={underlayColor}
      activeOpacity={0.6}
    >
      <>
        <View style={styles.headerWrapper}>
          <SvgUri svgXmlData={svgAssests.folder} width={32} height={32} />
          <View style={styles.metadata}>
            <Text style={styles.headerTitle} numberOfLines={1}>
              {props.title}
            </Text>
            <Text style={styles.headerDescription} numberOfLines={1}>
              {props.description}
            </Text>
          </View>
        </View>
        <View style={styles.arrowRightIcon}>
          <SvgUri svgXmlData={svgAssests.arrowRight} width={18} height={18} />
        </View>
      </>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    borderRadius,
    padding: 6,
    opacity: 0.9,
  },
  headerWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  headerTitle: {
    fontFamily: "medium",
    fontSize: 16,
  },
  headerDescription: {
    fontSize: 11,
    opacity: 0.8,
  },
  metadata: {
    width: "80%",
  },
  arrowRightIcon: {
    alignItems: "center",
    opacity: 0.8,
  },
});
