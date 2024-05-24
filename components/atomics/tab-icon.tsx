import React from "react";
import { View } from "react-native";
import { SvgProps } from "react-native-svg";

interface TabIconParam {
  Icon: React.FC<SvgProps>;
  FocusedIcon: React.FC<SvgProps>;
  focused: boolean;
}

export default function TabIcon({
  focused,
  Icon,
  FocusedIcon,
}: TabIconParam): React.JSX.Element {
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {focused ? (
        <FocusedIcon width={28} height={28} />
      ) : (
        <Icon width={28} height={28} />
      )}
    </View>
  );
}
