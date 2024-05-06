import React from "react";
import { Image, View } from "react-native";
import Text from "./text";
import SvgUri from "react-native-svg-uri";

interface TabIconParam {
  icon: string;
  name: string;
  focused: boolean;
}

export default function TabIcon({
  focused,
  icon,
  name,
}: TabIconParam): React.JSX.Element {
  return (
    <View
      style={{
        opacity: focused ? 1 : 0.6,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <SvgUri svgXmlData={icon} />
      <Text
        style={{
          fontSize: 10,
          fontFamily: "medium",
        }}
      >
        {name}
      </Text>
    </View>
  );
}
