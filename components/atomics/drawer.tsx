import React from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { modalBackgroundColor } from "@/constants/colors";

interface DrawerProps extends React.ComponentProps<"div"> {
  modalRef: React.MutableRefObject<null | BottomSheetModalMethods>;
}

export default function Drawer(props: DrawerProps): React.JSX.Element {
  const bottomSheetIndex: number = 0;
  const bottomSheetSnapPoint: Array<string> = ["50%"];

  return (
    <BottomSheetModal
      snapPoints={bottomSheetSnapPoint}
      index={bottomSheetIndex}
      ref={props.modalRef}
      backgroundStyle={{
        backgroundColor: modalBackgroundColor,
      }}
    >
      {props.children}
    </BottomSheetModal>
  );
}
