import React from "react";
import Text from "../atomics/text";
import { svgAssests } from "@/constants/assests";
import { borderColor } from "@/constants/colors";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Drawer, { DrawerProps, DrawerWrapper } from "../atomics/drawer";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { RadioCheckbox, RadioCheckboxData } from "./radio-checkbox";
import SvgUri from "react-native-svg-uri";
import SortByRepository from "@/repository/sort-by.repository";
import { SortBySetter, useSortByStore } from "@/stores/sort-by";

export default function MusicListHeader(): React.JSX.Element {
  const bottomSheetRef: React.MutableRefObject<BottomSheetModalMethods | null> =
    React.useRef(null);

  return (
    <>
      <View style={styles.wrapper}>
        <Text style={styles.textHeader}>Play some music!</Text>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => bottomSheetRef.current?.present()}
        >
          <SvgUri svgXmlData={svgAssests.listOptions} />
        </TouchableOpacity>
      </View>
      <View style={styles.bottomBorder}></View>
      <MusicListHeaderOptions modalRef={bottomSheetRef} />
    </>
  );
}

export function MusicListHeaderOptions(props: DrawerProps): React.JSX.Element {
  const sortByDispatch: SortBySetter = useSortByStore(
    (state) => state.setIsSortByStateStored
  );
  const [defaultCheckedId, setDefaultCheckedId] = React.useState<number>(1);
  const [dummyState, setdummyState] = React.useState<boolean>(false);
  const radioCheckboxData: Array<RadioCheckboxData> = [
    { id: 1, title: "By music title (ascending)", default: true },
    { id: 2, title: "By music title (descending)" },
  ];

  SortByRepository.getSortByStateAsync().then((state) =>
    setDefaultCheckedId(state == "ascending" ? 1 : 2)
  );

  const handleOnChecked = (itemId: number): void => {
    if (itemId === 1) {
      SortByRepository.setSortByState("ascending");
      sortByDispatch(true);
    }
    if (itemId == 2) {
      SortByRepository.setSortByState("descending");
      sortByDispatch(true);
    }

    sortByDispatch(false);
    // Force update component
    setdummyState(!dummyState);
    props.modalRef.current?.close();
  };

  return (
    <Drawer modalRef={props.modalRef} snapPoints={["28%"]}>
      <DrawerWrapper style={optionsStyles.wrapper}>
        <View style={optionsStyles.headerWrapper}>
          <Text style={optionsStyles.headerText}>
            Choose your favorite way to sort a lists
          </Text>
        </View>
        <RadioCheckbox
          data={radioCheckboxData}
          containerStyle={{ justifyContent: "space-between" }}
          defaultCheckedId={defaultCheckedId}
          onChecked={handleOnChecked}
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
  bottomBorder: {
    borderBottomColor: borderColor,
    height: 1,
    borderWidth: 0.5,
  },
  textHeader: {
    fontFamily: "medium",
    fontSize: 13,
  },
});

const optionsStyles = StyleSheet.create({
  wrapper: { gap: 20 },
  headerWrapper: {
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    fontFamily: "extraBold",
    fontSize: 15,
  },
  radioCheckbox: {
    justifyContent: "space-between",
  },
});
