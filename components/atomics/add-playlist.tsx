import React from "react";
import Drawer, { DrawerProps } from "./drawer";
import colors, {
  destructiveColor,
  inputBackgroundColor,
} from "@/constants/colors";
import Text from "./text";
import { StyleSheet, View } from "react-native";
import { borderRadius } from "@/constants/styles";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import { Button } from "./button";

export default function AddPlaylist(props: DrawerProps): React.JSX.Element {
  const snapPoints: Array<string> = React.useMemo(() => ["30%", "90%"], []);

  return (
    <Drawer
      keyboardBehavior="extend"
      modalRef={props.modalRef}
      snapPoints={snapPoints}
    >
      <View style={styles.wrapper}>
        <Text style={styles.title}>New Playlist</Text>
        <BottomSheetTextInput
          style={styles.input}
          placeholder="Name it something cool!"
          placeholderTextColor={colors.dark.text}
        />
        <View style={styles.buttonWrapper}>
          <Button style={styles.button}>Save</Button>
          <Button
            textStyle={{
              color: destructiveColor,
            }}
            style={styles.button}
            onPress={() => props.modalRef.current?.close()}
          >
            Cancel
          </Button>
        </View>
      </View>
    </Drawer>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 15,
    gap: 10,
    marginTop: 10,
  },
  title: {
    fontFamily: "bold",
    fontSize: 17,
  },
  buttonWrapper: {
    top: 5,
    gap: 8,
    flexDirection: "row",
    width: "100%",
  },
  button: {
    flex: 1,
  },
  input: {
    fontFamily: "medium",
    width: "100%",
    backgroundColor: inputBackgroundColor,
    padding: 9,
    paddingHorizontal: 13,
    fontSize: 13,
    color: colors.dark.text,
    borderRadius,
  },
});
