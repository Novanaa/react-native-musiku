import * as MediaLibrary from "expo-media-library";
import { Linking } from "react-native";

export default async function getPermission(): Promise<void> {
  const permission: Awaited<MediaLibrary.PermissionResponse> =
    await MediaLibrary.getPermissionsAsync();

  if (!permission.granted && !permission.canAskAgain) Linking.openSettings();

  if (!permission.granted && permission.canAskAgain) {
    await MediaLibrary.requestPermissionsAsync();

    return;
  }

  await MediaLibrary.requestPermissionsAsync();
}
