import React from "react";
import { View } from "react-native";
import { SvgProps } from "react-native-svg";

interface TabIconParam {
  Icon: React.FC<SvgProps>;
  focused: boolean;
}

export default function TabIcon({
  focused,
  Icon,
}: TabIconParam): React.JSX.Element {
  return (
    <View
      style={{
        opacity: focused ? 1 : 0.6,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Icon width={28} height={28} />
    </View>
  );
}
