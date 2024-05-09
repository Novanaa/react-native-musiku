import * as MediaLibrary from "expo-media-library";
import { Linking } from "react-native";

export default async function getPermission(
  setterState: React.Dispatch<React.SetStateAction<boolean>>
): Promise<void> {
  const permission: Awaited<MediaLibrary.PermissionResponse> =
    await MediaLibrary.getPermissionsAsync();

  if (!permission.granted && !permission.canAskAgain) Linking.openSettings();

  if (!permission.granted && permission.canAskAgain) {
    const requestedPermissions: Awaited<MediaLibrary.PermissionResponse> =
      await MediaLibrary.requestPermissionsAsync();

    if (!requestedPermissions.granted && !requestedPermissions.canAskAgain)
      Linking.openSettings();

    if (permission.granted) setterState(true);

    return;
  }

  if (permission.granted) setterState(true);

  return;
}
