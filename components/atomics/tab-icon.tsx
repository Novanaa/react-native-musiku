import React from "react";
import { Image, ImageSourcePropType, View } from "react-native";
import Text from "./text";

interface TabIconParam {
  icon: ImageSourcePropType;
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
      <Image source={icon} alt={name} />
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
