import { RefreshFolder } from "@/stores/folder";
import { RefreshMusic } from "@/stores/music";
import * as MediaLibrary from "expo-media-library";
import React from "react";
import { BackHandler, Linking } from "react-native";

interface GetPermissionProps {
  refreshMusic: RefreshMusic;
  refreshFolder: RefreshFolder;
  stateSetter: React.Dispatch<React.SetStateAction<boolean>>;
}

export default async function getPermission(
  params: GetPermissionProps
): Promise<void> {
  const permission: Awaited<MediaLibrary.PermissionResponse> =
    await MediaLibrary.getPermissionsAsync();

  if (!permission.granted && !permission.canAskAgain) Linking.openSettings();

  if (!permission.granted && permission.canAskAgain) {
    const requestedPermission: Awaited<MediaLibrary.PermissionResponse> =
      await MediaLibrary.requestPermissionsAsync();

    if (!requestedPermission.granted && requestedPermission.canAskAgain)
      BackHandler.exitApp();

    if (!requestedPermission.granted && !requestedPermission.canAskAgain)
      Linking.openSettings();

    if (requestedPermission.granted) {
      params.stateSetter(true);
      params.refreshMusic();
      params.refreshFolder();
    }
  }

  if (permission.granted) {
    params.stateSetter(true);
    params.refreshMusic();
    params.refreshFolder();
  }
}
