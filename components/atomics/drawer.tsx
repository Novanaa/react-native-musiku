import React from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import colors, { modalBackgroundColor } from "@/constants/colors";
import { View, ViewProps } from "react-native";

export interface DrawerProps extends React.ComponentProps<"div"> {
  modalRef: React.MutableRefObject<null | BottomSheetModalMethods>;
  snapPoints?: Array<string>;
}

export default function Drawer(props: DrawerProps): React.JSX.Element {
  const bottomSheetIndex: number = 0;
  const bottomSheetSnapPoint: Array<string> = props.snapPoints || ["50%"];

  return (
    <BottomSheetModal
      snapPoints={bottomSheetSnapPoint}
      index={bottomSheetIndex}
      ref={props.modalRef}
      backgroundStyle={{
        backgroundColor: modalBackgroundColor,
      }}
      handleIndicatorStyle={{ backgroundColor: colors.light.background }}
    >
      {props.children}
    </BottomSheetModal>
  );
}

export function DrawerWrapper(props: ViewProps): React.JSX.Element {
  return <View style={[{ padding: 15 }, props.style]}>{props.children}</View>;
}
