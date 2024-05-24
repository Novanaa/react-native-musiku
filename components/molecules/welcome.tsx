import React from "react";
import { BackHandler, StyleSheet, View, ViewProps } from "react-native";
import Text from "../atomics/text";
import ApplicationRepository from "@/repository/app.repository";
import Drawer, { DrawerWrapper } from "../atomics/drawer";
import { modalBackgroundColor } from "@/constants/colors";
import { Button } from "../atomics/button";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import getPermission from "@/utils/permission";
import { RefreshMusic, useMusicStore } from "@/stores/music";
import { RefreshFolder, useFolderStore } from "@/stores/folder";
import SearchNotFoundSVG from "@/assets/images/search-not-found.svg";

export function SearchWelcomeScreen(): React.JSX.Element {
  return (
    <View style={searchWelcomeScreenStyles.wrapper}>
      <SearchNotFoundSVG width={100} height={100} />
      <Text style={searchWelcomeScreenStyles.title}>Hey! What's up?</Text>
      <Text style={searchWelcomeScreenStyles.description}>
        Type something in top search bar and see the magic!
      </Text>
    </View>
  );
}

export function Welcome(props: ViewProps): React.JSX.Element {
  const refreshMusic: RefreshMusic = useMusicStore((state) => state.refresh);
  const refreshFolder: RefreshFolder = useFolderStore((state) => state.refresh);
  const [, setIsAccepted] = React.useState<boolean>(false);
  const drawerRef: React.MutableRefObject<BottomSheetModalMethods | null> =
    React.useRef<BottomSheetModalMethods | null>(null);
  const isAppFirstLaunched: string =
    ApplicationRepository.getIsAppFirstLaunchedState();

  React.useEffect(() => {
    if (!isAppFirstLaunched) {
      ApplicationRepository.setIsAppFirstLaunchedState("true");
      drawerRef.current?.present();
    }
  }, []);

  if (isAppFirstLaunched) return <>{props.children}</>;

  return (
    <Drawer
      enableContentPanningGesture={false}
      enableHandlePanningGesture={false}
      modalRef={drawerRef}
      snapPoints={["38%"]}
      handleIndicatorStyle={{ backgroundColor: modalBackgroundColor }}
    >
      <DrawerWrapper style={welcomeStyles.wrapper}>
        <Text style={welcomeStyles.headerText}>Before Using This App</Text>
        <Text style={welcomeStyles.headerDescription}>
          By using the Musiku, you agree to its terms and conditions, including
          granting access to your device's music library,
        </Text>
        <View style={welcomeStyles.buttonWrapper}>
          <Button
            onPress={() => {
              getPermission(refreshMusic, refreshFolder);
              setIsAccepted(true);
            }}
          >
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

const searchWelcomeScreenStyles = StyleSheet.create({
  wrapper: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    gap: 6,
    opacity: 0.85,
  },
  title: {
    fontFamily: "bold",
    fontSize: 18,
  },
  description: {
    textAlign: "center",
    width: "60%",
    opacity: 0.8,
  },
});

const welcomeStyles = StyleSheet.create({
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
