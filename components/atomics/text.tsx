import { Text as NativeText, TextProps } from "react-native";
import React from "react";
import colors from "@/constants/colors";

export default function Text(props: TextProps): React.JSX.Element {
  return (
    <NativeText
      style={[{ fontFamily: "regular", color: colors.dark.text }, props.style]}
      numberOfLines={props.numberOfLines}
      ellipsizeMode={props.ellipsizeMode}
    >
      {props.children}
    </NativeText>
  );
}
