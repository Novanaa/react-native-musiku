import { BottomSheetProps } from "@gorhom/bottom-sheet";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import React from "react";
import Drawer from "./drawer";

export interface ModalProps extends BottomSheetProps {
  modalRef: React.MutableRefObject<BottomSheetModalMethods | null>;
}

export default function Modal(props: ModalProps): React.JSX.Element {
  const modalSnapPoints =
    React.useMemo(() => ["30%", "65%"], []) ||
    React.useMemo(() => props.snapPoints, []);

  return (
    <Drawer
      snapPoints={modalSnapPoints}
      detached
      bottomInset={70}
      backgroundStyle={{
        backgroundColor: "transparent",
      }}
      style={{
        margin: 15,
      }}
      handleIndicatorStyle={{
        backgroundColor: "transparent",
      }}
      keyboardBehavior="extend"
      {...props}
    >
      {props.children}
    </Drawer>
  );
}
