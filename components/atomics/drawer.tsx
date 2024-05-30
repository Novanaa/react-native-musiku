import React from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import colors, { modalBackgroundColor } from "@/constants/colors";
import { StyleProp, View, ViewProps, ViewStyle } from "react-native";

export interface DrawerProps extends ViewProps {
  modalRef: React.MutableRefObject<null | BottomSheetModalMethods>;
  snapPoints?: Array<string>;
  enablePanDownToClose?: boolean;
  handleIndicatorStyle?: StyleProp<ViewStyle>;
  enableHandlePanningGesture?: boolean;
  enableContentPanningGesture?: boolean;
  keyboardBehavior?: "interactive" | "extend" | "fillParent" | undefined;
  keyboardBlurBehavior?: "none" | "restore" | undefined;
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
      enableHandlePanningGesture={props.enableHandlePanningGesture}
      enableContentPanningGesture={props.enableContentPanningGesture}
      handleIndicatorStyle={{ backgroundColor: colors.light.background }}
      keyboardBehavior={props.keyboardBehavior}
      keyboardBlurBehavior={props.keyboardBlurBehavior}
      {...props}
    >
      {props.children}
    </BottomSheetModal>
  );
}

export function DrawerWrapper(props: ViewProps): React.JSX.Element {
  return <View style={[{ padding: 15 }, props.style]}>{props.children}</View>;
}
