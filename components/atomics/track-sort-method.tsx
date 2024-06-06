import { StyleSheet, View } from "react-native";
import Drawer, { DrawerProps } from "./drawer";
import { RadioCheckbox, RadioCheckboxData } from "../molecules/radio-checkbox";
import React from "react";
import SparklesSVG from "@/assets/icons/sparkles.svg";
import ArrowPathSVG from "@/assets/icons/arrow-path.svg";
import ListOptionsSVG from "@/assets/icons/list-options.svg";
import { SetRepeatMode, useRepeatModeStore } from "@/stores/repeat-mode";
import { RepeatMode } from "@/interfaces/repeat-mode";

export default function TrackSortMethod(props: DrawerProps): React.JSX.Element {
  const [defaultCheckedId, setDefaultCheckedId] = React.useState<number>(1);
  const repeatMode: RepeatMode = useRepeatModeStore(
    (state) => state.repeatMode
  );
  const setRepeatMode: SetRepeatMode = useRepeatModeStore(
    (state) => state.setRepeatMode
  );
  const sortMethodList: Array<RadioCheckboxData> = [
    {
      id: 1,
      title: "Ascending Play Mode",
      icon: ListOptionsSVG,
    },
    {
      id: 2,
      title: "Play Once Mode",
      icon: ArrowPathSVG,
    },
    {
      id: 3,
      title: "Repeat Play Mode",
      icon: SparklesSVG,
    },
  ];

  React.useEffect(() => {
    const setter: Record<typeof repeatMode, () => void> = {
      ascending_play: () => setDefaultCheckedId(1),
      play_once: () => setDefaultCheckedId(2),
      repeat_play: () => setDefaultCheckedId(3),
    };

    setter[repeatMode]();
  }, [repeatMode]);

  const handleOnChecked = React.useCallback((itemId: number) => {
    const setter: Record<number, () => void> = {
      1: () => setRepeatMode("ascending_play"),
      2: () => setRepeatMode("play_once"),
      3: () => setRepeatMode("play_once"),
    };

    setter[itemId]();
    props.modalRef.current?.close();
  }, []);

  return (
    <Drawer modalRef={props.modalRef} stackBehavior="push" snapPoints={["28%"]}>
      <View style={styles.wrapper}>
        <RadioCheckbox
          onChecked={handleOnChecked}
          defaultCheckedId={defaultCheckedId}
          containerStyle={styles.radioCheckboxContainer}
          data={sortMethodList}
        />
      </View>
    </Drawer>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingTop: 17,
    paddingBottom: 12,
    paddingHorizontal: 6,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  radioCheckboxContainer: {
    justifyContent: "space-between",
    width: "100%",
  },
});
