import React from "react";
import { StyleSheet, View } from "react-native";
import Text from "../atomics/text";
import { svgAssests } from "@/constants/assests";
import { IconButton } from "../atomics/button";
import { Router, useRouter } from "expo-router";
import {
  UserPermissionContext,
  UserPermissionContextData,
} from "@/providers/user-permission";

export default function Header(): React.JSX.Element {
  const router: Router = useRouter();
  const permissionContext: UserPermissionContextData = React.useContext(
    UserPermissionContext
  );

  return (
    <View style={styles.container}>
      <Text style={styles.appName}>Musiku</Text>
      <View style={styles.iconWrapper}>
        {!permissionContext.permission?.granted ? (
          <IconButton
            icon={svgAssests.folderDownArrow}
            onPress={() => permissionContext.ref?.current?.present()}
          />
        ) : null}
        <IconButton
          icon={svgAssests.scanMusic}
          onPress={() => router.push("/scan")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 70,
    paddingBottom: 20,
    justifyContent: "space-between",
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
  },
  appName: {
    fontFamily: "bold",
    fontSize: 18,
  },
  iconWrapper: {
    flexDirection: "row",
    gap: 10,
  },
});
