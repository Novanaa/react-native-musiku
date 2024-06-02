import FloatingMusic from "@/components/atomics/floating-music";
import BottomTabs from "@/components/molecules/bottom-tabs";
import React from "react";

export default function TabsLayout(): React.JSX.Element {
  return (
    <>
      <BottomTabs />
      <FloatingMusic />
    </>
  );
}
