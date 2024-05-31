import React from "react";
import Text from "../atomics/text";
import { borderColor } from "@/constants/colors";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Drawer, { DrawerProps, DrawerWrapper } from "../atomics/drawer";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { RadioCheckbox, RadioCheckboxData } from "./radio-checkbox";
import SortByRepository from "@/repository/sort-by.repository";
import { RefreshMusic, useMusicStore } from "@/stores/music";
import ListOptionsSVG from "@/assets/icons/list-options.svg";
import SortBy from "@/interfaces/sort-by";

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
          <ListOptionsSVG />
        </TouchableOpacity>
      </View>
      <View style={styles.bottomBorder}></View>
      <MusicListHeaderOptions modalRef={bottomSheetRef} />
    </>
  );
}

export function MusicListHeaderOptions(props: DrawerProps): React.JSX.Element {
  const refreshMusic: RefreshMusic = useMusicStore((state) => state.refresh);
  const [dummyState, setDummyState] = React.useState<boolean>(false);
  const [defaultCheckedId, setDefaultCheckedId] = React.useState<number>(1);
  const sortByState: SortBy = React.useMemo(
    () => SortByRepository.getSortByState(),
    [dummyState]
  );
  const radioCheckboxData: Array<RadioCheckboxData> = [
    { id: 1, title: "Recently Music Added", default: true },
    { id: 2, title: "Lately Music Added" },
    { id: 3, title: "By Music Duration" },
    { id: 4, title: "By Alphabet (Ascending)" },
    { id: 5, title: "By Alphabet (Descending)" },
  ];

  React.useEffect(() => {
    const setter: Record<typeof sortByState, () => void> = {
      recently_added: () => setDefaultCheckedId(1),
      lately_added: () => setDefaultCheckedId(2),
      duration: () => setDefaultCheckedId(3),
      ascending: () => setDefaultCheckedId(4),
      descending: () => setDefaultCheckedId(5),
    };

    setter[sortByState]();
  }, []);

  /* eslint-disable no-unused-vars */
  const handleOnChecked: (itemId: number) => void = (itemId: number): void => {
    const setter: Record<number, () => void> = {
      1: () => SortByRepository.setSortByState("recently_added"),
      2: () => SortByRepository.setSortByState("lately_added"),
      3: () => SortByRepository.setSortByState("duration"),
      4: () => SortByRepository.setSortByState("ascending"),
      5: () => SortByRepository.setSortByState("descending"),
    };

    setter[itemId]();
    refreshMusic();
    setDummyState(!dummyState);
    props.modalRef.current?.close();
  };

  return (
    <Drawer modalRef={props.modalRef} snapPoints={["45%"]}>
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
