import React from "react";
import { BottomSheetModal, BottomSheetModalProps } from "@gorhom/bottom-sheet";
import colors, {
  backgroundColor,
  modalBackgroundColor,
} from "@/constants/colors";
import { View, ViewProps } from "react-native";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";

export interface DrawerProps extends Omit<BottomSheetModalProps, "children"> {
  modalRef: React.MutableRefObject<null | BottomSheetModalMethods>;
}

interface DrawerComponentProps extends BottomSheetModalProps {
  modalRef: React.MutableRefObject<null | BottomSheetModalMethods>;
}

export default function Drawer(props: DrawerComponentProps): React.JSX.Element {
  const children: React.ReactNode = props.children as React.ReactNode;
  const bottomSheetIndex: number = 0;
  const bottomSheetSnapPoints =
    React.useMemo(() => props.snapPoints, []) ||
    React.useMemo(() => ["50%"], []);

  return (
    <BottomSheetModal
      snapPoints={bottomSheetSnapPoints}
      index={bottomSheetIndex}
      ref={props.modalRef}
      backdropComponent={({ style }) => (
        <View
          // @ts-expect-error interfaces conflicts
          onStartShouldSetResponder={() => props.modalRef.current?.close()}
          style={[
            style,
            {
              backgroundColor: backgroundColor,
              opacity: 0.5,
            },
          ]}
        />
      )}
      backgroundStyle={{
        backgroundColor: modalBackgroundColor,
      }}
      handleIndicatorStyle={{ backgroundColor: colors.light.background }}
      {...props}
    >
      {children}
    </BottomSheetModal>
  );
}

export function DrawerWrapper(props: ViewProps): React.JSX.Element {
  return <View style={[{ padding: 15 }, props.style]}>{props.children}</View>;
}
