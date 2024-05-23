import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import Text from "./text";
import { borderRadius } from "@/constants/styles";
import { useRouter } from "expo-router";
import { StaticRoutes } from "@/interfaces/app";
import { ExpoRouter } from "expo-router/types/expo-router";
import FolderSVG from "@/assets/icons/folder.svg";
import ArrowRightSVG from "@/assets/icons/arrow-right.svg";

interface FolderProps {
  title: string;
  path: string;
}

function Folder(props: FolderProps): React.JSX.Element {
  const router: ExpoRouter.Router = useRouter();
  const href: StaticRoutes = `/folder?path=${props.path}` as StaticRoutes;

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => router.push(href)}
      activeOpacity={0.6}
    >
      <>
        <View style={styles.headerWrapper}>
          <FolderSVG width={32} height={32} />
          <View style={styles.metadata}>
            <Text style={styles.headerTitle} numberOfLines={1}>
              {props.title}
            </Text>
            <Text style={styles.headerPath} numberOfLines={1}>
              {props.path}
            </Text>
          </View>
        </View>
        <View style={styles.arrowRightIcon}>
          <ArrowRightSVG width={18} height={18} />
        </View>
      </>
    </TouchableOpacity>
  );
}

export default React.memo(Folder);

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
  headerPath: {
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
