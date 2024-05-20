import { RefreshFolder } from "@/stores/folder";
import { RefreshMusic } from "@/stores/music";
import * as MediaLibrary from "expo-media-library";
import { BackHandler, Linking } from "react-native";

export default async function getPermission(
  refreshMusic: RefreshMusic,
  refreshFolder: RefreshFolder
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
      refreshMusic();
      refreshFolder();
    }
  }

  if (permission.granted) {
    refreshMusic();
    refreshFolder();
  }
}
