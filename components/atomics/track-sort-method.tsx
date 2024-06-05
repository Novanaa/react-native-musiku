import { StyleSheet } from "react-native";
import Drawer, { DrawerWrapper, DrawerProps } from "./drawer";
import { RadioCheckbox, RadioCheckboxData } from "../molecules/radio-checkbox";
import React from "react";
import SparklesSVG from "@/assets/icons/sparkles.svg";
import ArrowPathSVG from "@/assets/icons/arrow-path.svg";
import ListOptionsSVG from "@/assets/icons/list-options.svg";

export default function TrackSortMethod(props: DrawerProps): React.JSX.Element {
  const [defaultCheckedId] = React.useState<number>(1);
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
      title: "Shuffle Music Mode",
      icon: SparklesSVG,
    },
  ];

  return (
    <Drawer modalRef={props.modalRef} stackBehavior="push" snapPoints={["28%"]}>
      <DrawerWrapper style={styles.wrapper}>
        <RadioCheckbox
          defaultCheckedId={defaultCheckedId}
          containerStyle={styles.radioCheckboxContainer}
          data={sortMethodList}
        />
      </DrawerWrapper>
    </Drawer>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingTop: 17,
    paddingBottom: 12,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  radioCheckboxContainer: {
    justifyContent: "space-between",
    width: "100%",
  },
});
