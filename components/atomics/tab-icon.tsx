import React from "react";
import { View } from "react-native";
import SvgUri from "react-native-svg-uri";

interface TabIconParam {
  icon: string;
  focused: boolean;
}

export default function TabIcon({
  focused,
  icon,
}: TabIconParam): React.JSX.Element {
  return (
    <View
      style={{
        opacity: focused ? 1 : 0.6,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <SvgUri svgXmlData={icon} width={28} height={28} />
    </View>
  );
}
