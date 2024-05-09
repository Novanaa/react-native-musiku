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
import colors, { modalBackgroundColor } from "@/constants/colors";

export type UserPermissionContextData = boolean;

interface UserPermissionProvider extends ViewProps {}

interface UserPermissionAlertProps extends DrawerProps {
  setIsAllowedTo: React.Dispatch<React.SetStateAction<boolean>>;
}

export const UserPermissionContext =
  React.createContext<UserPermissionContextData>(false);

export function UserPermissionProvider(
  props: UserPermissionProvider
): React.ReactNode {
  const [isAllowedTo, setIsAllowedTo] = React.useState<boolean>(false);
  const [permission] = MediaLibrary.usePermissions();
  const isGranted: boolean = permission?.granted || isAllowedTo;
  const drawerRef: React.MutableRefObject<null | BottomSheetModalMethods> =
    React.useRef(null);

  React.useEffect(() => {
    if (!permission?.granted && !permission?.canAskAgain)
      drawerRef.current?.present();

    if (!permission?.granted && permission?.canAskAgain)
      drawerRef.current?.present();
  }, []);

  return isGranted ? (
    <>{props.children}</>
  ) : (
    <View style={{ backgroundColor: colors.dark.background }}>
      <UserPermissionContext.Provider value={isGranted}>
        {props.children}
      </UserPermissionContext.Provider>
      <UserPermissionAlert
        modalRef={drawerRef}
        setIsAllowedTo={setIsAllowedTo}
      />
    </View>
  );
}

export default function UserPermissionAlert(
  props: UserPermissionAlertProps
): React.JSX.Element {
  return (
    <Drawer
      modalRef={props.modalRef}
      snapPoints={["38%"]}
      handleIndicatorStyle={{ backgroundColor: modalBackgroundColor }}
    >
      <DrawerWrapper style={styles.wrapper}>
        <Text style={styles.headerText}>Before Using This App</Text>
        <Text style={styles.headerDescription}>
          By using the Musiku, you agree to its terms and conditions, including
          granting access to your device's music library,
        </Text>
        <View style={styles.buttonWrapper}>
          <Button onPress={() => getPermission(props.setIsAllowedTo)}>
            Accept
          </Button>
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
