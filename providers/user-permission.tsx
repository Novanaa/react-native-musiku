import Drawer, {
  DrawerProps,
  DrawerWrapper,
} from "../components/atomics/drawer";
import React from "react";
import { StyleSheet, View, ViewProps, BackHandler } from "react-native";
import * as MediaLibrary from "expo-media-library";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import Text from "../components/atomics/text";
import { Button } from "@/components/atomics/button";
import getPermission from "@/utils/get-permission";

export interface UserPermissionContextData {
  ref: React.MutableRefObject<null | BottomSheetModalMethods> | null;
  permission: null | MediaLibrary.PermissionResponse;
}

export const UserPermissionContext =
  React.createContext<UserPermissionContextData>({
    permission: null,
    ref: null,
  });

export function UserPermissionProvider(props: ViewProps): React.ReactNode {
  const [permission] = MediaLibrary.usePermissions();
  const [userPermission, setUserPermission] =
    React.useState<null | MediaLibrary.PermissionResponse>(null);
  const drawerRef: React.MutableRefObject<null | BottomSheetModalMethods> =
    React.useRef(null);

  React.useEffect(() => {
    if (!permission?.granted && !permission?.canAskAgain)
      drawerRef.current?.present();

    if (!permission?.granted && permission?.canAskAgain)
      drawerRef.current?.present();

    setUserPermission(permission);
  }, []);

  return (
    <>
      <UserPermissionContext.Provider
        value={{ permission: userPermission, ref: drawerRef }}
      >
        {props.children}
      </UserPermissionContext.Provider>
      <UserPermissionAlert modalRef={drawerRef} />
    </>
  );
}

export default function UserPermissionAlert(
  props: DrawerProps
): React.JSX.Element {
  return (
    <Drawer modalRef={props.modalRef} snapPoints={["38%"]}>
      <DrawerWrapper style={styles.wrapper}>
        <Text style={styles.headerText}>Before Using This App</Text>
        <Text style={styles.headerDescription}>
          By using the Musiku, you agree to its terms and conditions, including
          granting access to your device's music library,
        </Text>
        <View style={styles.buttonWrapper}>
          <Button onPress={() => getPermission()}>Accept</Button>
          <Button
            textStyle={{ color: "#fc4949" }}
            onPress={() => BackHandler.exitApp()}
          >
            Quit this app
          </Button>
        </View>
      </DrawerWrapper>
    </Drawer>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: "center",
    alignItems: "center",
    gap: 7,
  },
  headerText: {
    fontFamily: "bold",
    fontSize: 17,
  },
  headerDescription: {
    textAlign: "center",
    opacity: 0.8,
    fontFamily: "medium",
    width: "90%",
  },
  buttonWrapper: {
    width: "100%",
    top: 8,
    gap: 10,
  },
});
