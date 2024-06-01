import { StyleSheet, View } from "react-native";
import Drawer, { DrawerProps, DrawerWrapper } from "./drawer";
import Text from "./text";
import { Button } from "./button";
import { destructiveColor } from "@/constants/colors";
import resetPlaylist from "@/utils/reset-playlist";
import { RefreshPlaylist, usePlaylistStore } from "@/stores/playlist";
import React from "react";
import showToast from "@/utils/toast";

export function RemovesAllPlaylist(props: DrawerProps): React.JSX.Element {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const refreshPlaylist: RefreshPlaylist = usePlaylistStore(
    (state) => state.refresh
  );

  return (
    <Drawer modalRef={props.modalRef} snapPoints={["38%"]}>
      <DrawerWrapper style={removesPlaylistStyles.wrapper}>
        <Text style={removesPlaylistStyles.title}>Before Continue</Text>
        <Text style={removesPlaylistStyles.description}>
          This action cause removes all your existing playlist. Think again if
          you want to removes all your existing playlist.
        </Text>
        <View style={removesPlaylistStyles.actionWrapper}>
          <Button
            disabled={isLoading}
            textStyle={{
              color: destructiveColor,
            }}
            onPress={() => {
              resetPlaylist({
                refreshPlaylist,
                drawerRef: props.modalRef,
                setIsLoading,
              });

              showToast("Successfully removes all of your playlist!");
            }}
          >
            Removes
          </Button>
          <Button
            onPress={() => props.modalRef.current?.close()}
            disabled={isLoading}
          >
            Cancel
          </Button>
        </View>
      </DrawerWrapper>
    </Drawer>
  );
}

const removesPlaylistStyles = StyleSheet.create({
  wrapper: {
    justifyContent: "center",
    alignItems: "center",
    gap: 2,
  },
  title: {
    fontFamily: "bold",
    fontSize: 18,
  },
  description: {
    textAlign: "center",
    opacity: 0.8,
    fontFamily: "medium",
    width: "90%",
  },
  actionWrapper: {
    width: "100%",
    top: 15,
    gap: 8,
  },
});
